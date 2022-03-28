import CreateProjectsTable from './20211201195550-create-project';
import CreateUnitsTable from './20211201194652-create-unit';
import CreateLabelsTable from './20211201194416-create-label';
import CreateRelatedProjectsTable from './20211201194449-create-related-project';
import CreateIssuancesTable from './20211201194541-create-issuance';
import CreateProjectRatingsTable from './20211201194803-create-project-rating';
import CreateCoBenefitsTable from './20211201194914-create-co-benefit';
import CreateProjectLocationTable from './20211201195016-create-project-location';
import CreateStagingTable from './20211207145446-staging';
import InitFtsModule from './20211212200953-fulltext-search';
import CreateLabelUnitsTable from './20211215213314-label-units-junction';
import CreateProjectTriggers from './20211219182106-sqlite-triggers-projects';
import CreateUnitTriggers from './20211219184405-sqlite-triggers-units';
import AddOrgUidIndex from './20220115134849-add-orgUid-index';
import CreateSimulatorTable from './20220122141750-create-simulator-table';
import CreateOrganizationTable from './20220122164836-create-organization-table';
import CreateEstimationTable from './20220127190529-create-estimation-table';
import CreateAuditTable from './20220222204323-create-audit-table';
import CreateMetaTable from './20220119211024-create-meta-table';
import CreateGoveranceTable from './20220315134151-create-governance-table';

export const migrations = [
  {
    migration: CreateProjectsTable,
    name: '20211201195550-create-project.js',
  },
  {
    migration: CreateIssuancesTable,
    name: '20211201194541-create-issuance.js',
  },
  {
    migration: CreateUnitsTable,
    name: '20211201194652-create-unit.js',
  },
  {
    migration: CreateLabelsTable,
    name: '20211201194416-create-label.js',
  },
  {
    migration: CreateRelatedProjectsTable,
    name: '20211201194449-create-related-project.js',
  },
  {
    migration: CreateProjectRatingsTable,
    name: '20211201194803-create-project-rating.js',
  },
  {
    migration: CreateCoBenefitsTable,
    name: '20211201194914-create-co-benefit.js',
  },
  {
    migration: CreateProjectLocationTable,
    name: '20211201195016-create-project-location.js',
  },
  {
    migration: CreateStagingTable,
    name: '20211212200953-fulltext-search.js',
  },
  {
    migration: CreateLabelUnitsTable,
    name: '20211215213314-label-units-junction.js',
  },
  {
    migration: CreateLabelUnitsTable,
    name: '20211215213314-label-units-junction.js',
  },
  {
    migration: CreateSimulatorTable,
    name: '20220122141750-create-simulator-table.js',
  },
  {
    migration: CreateOrganizationTable,
    name: '20220122164836-create-organization-table.js',
  },
  {
    migration: CreateEstimationTable,
    name: '20220127190529-create-estimation-table.js',
  },
  {
    migration: CreateAuditTable,
    name: '20220222204323-create-audit-table.js',
  },
  {
    migration: CreateMetaTable,
    name: '20220119211024-create-meta-table.js',
  },
  {
    migration: InitFtsModule,
    name: '20211201195016-create-project-location.js',
  },
  {
    migration: CreateProjectTriggers,
    name: '20211219182106-sqlite-triggers-projects.js',
  },
  {
    migration: CreateUnitTriggers,
    name: '20211219184405-sqlite-triggers-units.js',
  },
  {
    migration: AddOrgUidIndex,
    name: '20220115134849-add-orgUid-index.js',
  },
  {
    migration: CreateGoveranceTable,
    name: '20220315134151-create-governance-table',
  },
];
