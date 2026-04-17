import { Pool } from "pg";
import { empreendimentos } from "@/content/empreendimentos";

type HomePlatformMetrics = {
  source: "database_live" | "fallback_snapshot";
  snapshotLabel: string;
  partners: {
    total: number;
    active: number;
    pending: number;
    activeOrgs: number;
  };
  projects: {
    public: number;
    citiesWithAvailable: number;
  };
  units: {
    total: number;
    available: number;
    reserved: number;
    negotiation: number;
    sold: number;
  };
  documents: {
    total: number;
    partner: number;
    public: number;
  };
  activity: {
    last30Days: number;
  };
};

const FALLBACK_METRICS: HomePlatformMetrics = {
  source: "fallback_snapshot",
  snapshotLabel: "17/04/2026 19:50",
  partners: {
    total: 69,
    active: 61,
    pending: 8,
    activeOrgs: 28,
  },
  projects: {
    public: 12,
    citiesWithAvailable: 6,
  },
  units: {
    total: 501,
    available: 319,
    reserved: 182,
    negotiation: 0,
    sold: 0,
  },
  documents: {
    total: 487,
    partner: 319,
    public: 168,
  },
  activity: {
    last30Days: 22147,
  },
};

const cityBySlugFallback = new Map<string, string>(
  empreendimentos.map((item) => [item.slug, item.localizacao]),
);

function normalizeConnectionString(value: string): string {
  return value.replace(/^postgresql\+psycopg2:\/\//i, "postgresql://");
}

function toCount(value: unknown): number {
  const asNumber = Number(value ?? 0);
  return Number.isFinite(asNumber) ? asNumber : 0;
}

function formatLisbonSnapshot(date: Date): string {
  const formatter = new Intl.DateTimeFormat("pt-PT", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(date).replace(",", "");
}

function inferCityLabel(description: string | null, slug: string): string | null {
  const raw = (description || "").toUpperCase();
  const checks: Array<[RegExp, string]> = [
    [/LEIRIA/, "Leiria"],
    [/MONTIJO/, "Montijo"],
    [/NAZAR[EÉ]/, "Nazare"],
    [/SANTAR[EÉ]M/, "Santarem"],
    [/OUR[EÉ]M/, "Ourem"],
    [/F[ÁA]TIMA/, "Fatima"],
  ];

  for (const [pattern, city] of checks) {
    if (pattern.test(raw)) return city;
  }

  return cityBySlugFallback.get(slug) || null;
}

declare global {
  // eslint-disable-next-line no-var
  var __homeflixPlatformMetricsPool: Pool | undefined;
}

function getPool(): Pool | null {
  const rawUrl = process.env.PLATFORM_DATABASE_URL?.trim();
  if (!rawUrl) return null;

  if (!global.__homeflixPlatformMetricsPool) {
    global.__homeflixPlatformMetricsPool = new Pool({
      connectionString: normalizeConnectionString(rawUrl),
      max: 3,
      ssl: { rejectUnauthorized: false },
    });
  }

  return global.__homeflixPlatformMetricsPool;
}

export async function getHomePlatformMetrics(): Promise<HomePlatformMetrics> {
  const pool = getPool();
  if (!pool) {
    return FALLBACK_METRICS;
  }

  const tenantId = process.env.PLATFORM_TENANT_ID?.trim() || null;
  const params = tenantId ? [tenantId] : [];
  const tenantClause = tenantId ? " = $1" : " IS NOT NULL";
  const scopedPublicProjectsWhere = tenantId
    ? "WHERE p.is_public = TRUE AND p.tenant_id = $1"
    : "WHERE p.is_public = TRUE";
  const scopedTenantWhere = tenantId ? `WHERE tenant_id${tenantClause}` : "";
  const scopedTenantAndActivityWhere = tenantId
    ? `WHERE tenant_id${tenantClause} AND created_at >= NOW() - INTERVAL '30 days'`
    : "WHERE created_at >= NOW() - INTERVAL '30 days'";
  const scopedPartnerOrgWhere = tenantId
    ? `WHERE tenant_id${tenantClause} AND status = 'ACTIVE'`
    : "WHERE status = 'ACTIVE'";

  try {
    const [
      partnersResult,
      partnerOrgsResult,
      projectsResult,
      unitsResult,
      documentsResult,
      activityResult,
      projectsForCitiesResult,
      nowResult,
    ] = await Promise.all([
      pool.query(
        `
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE status = 'ACTIVE')::int AS active,
            COUNT(*) FILTER (WHERE status = 'PENDING')::int AS pending
          FROM partner_users
          ${scopedTenantWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT COUNT(*)::int AS active_orgs
          FROM partner_orgs
          ${scopedPartnerOrgWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT COUNT(*)::int AS public_projects
          FROM projects p
          ${scopedPublicProjectsWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE u.status_current = 'AVAILABLE')::int AS available,
            COUNT(*) FILTER (WHERE u.status_current = 'RESERVED')::int AS reserved,
            COUNT(*) FILTER (WHERE u.status_current = 'NEGOTIATION')::int AS negotiation,
            COUNT(*) FILTER (WHERE u.status_current = 'SOLD')::int AS sold
          FROM units u
          JOIN projects p ON p.id = u.project_id
          ${scopedPublicProjectsWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE visibility = 'PARTNER')::int AS partner,
            COUNT(*) FILTER (WHERE visibility = 'PUBLIC')::int AS public
          FROM documents
          ${scopedTenantWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT COUNT(*)::int AS activity_30d
          FROM activity_log
          ${scopedTenantAndActivityWhere}
        `,
        params,
      ),
      pool.query(
        `
          SELECT
            p.slug,
            p.description,
            COUNT(*) FILTER (WHERE u.status_current = 'AVAILABLE')::int AS available_units
          FROM projects p
          LEFT JOIN units u ON u.project_id = p.id
          ${scopedPublicProjectsWhere}
          GROUP BY p.slug, p.description
        `,
        params,
      ),
      pool.query("SELECT NOW() AS now_utc"),
    ]);

    const partnerRow = partnersResult.rows[0] || {};
    const partnerOrgsRow = partnerOrgsResult.rows[0] || {};
    const projectsRow = projectsResult.rows[0] || {};
    const unitsRow = unitsResult.rows[0] || {};
    const docsRow = documentsResult.rows[0] || {};
    const activityRow = activityResult.rows[0] || {};
    const nowRow = nowResult.rows[0] || {};

    const citySet = new Set<string>();
    for (const row of projectsForCitiesResult.rows) {
      if (toCount(row.available_units) <= 0) continue;
      const city = inferCityLabel((row.description as string | null) || null, String(row.slug || ""));
      if (city) citySet.add(city);
    }

    const now = nowRow.now_utc instanceof Date ? nowRow.now_utc : new Date();

    return {
      source: "database_live",
      snapshotLabel: formatLisbonSnapshot(now),
      partners: {
        total: toCount(partnerRow.total),
        active: toCount(partnerRow.active),
        pending: toCount(partnerRow.pending),
        activeOrgs: toCount(partnerOrgsRow.active_orgs),
      },
      projects: {
        public: toCount(projectsRow.public_projects),
        citiesWithAvailable: citySet.size,
      },
      units: {
        total: toCount(unitsRow.total),
        available: toCount(unitsRow.available),
        reserved: toCount(unitsRow.reserved),
        negotiation: toCount(unitsRow.negotiation),
        sold: toCount(unitsRow.sold),
      },
      documents: {
        total: toCount(docsRow.total),
        partner: toCount(docsRow.partner),
        public: toCount(docsRow.public),
      },
      activity: {
        last30Days: toCount(activityRow.activity_30d),
      },
    };
  } catch (error) {
    console.error("[homeflix] live metrics query failed, fallback in use", error);
    return FALLBACK_METRICS;
  }
}

export type { HomePlatformMetrics };
