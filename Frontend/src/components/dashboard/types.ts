export type LeadsStats = {
  academyLeads: number;
  academyRegistrations: number;
  studentRegistrations: number;
  professionalRegistrations: number;
  consultingLeads: number;
  aiLeads: number;
  /** Sum of academyLeads + consultingLeads + aiLeads, the records `GET /leads` returns.
   *  Registrations are counted separately in academyRegistrations. */
  totalLeads: number;
};
