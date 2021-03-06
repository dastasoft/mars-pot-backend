type Company = {
  about: string;
  industries: string[];
  name: string;
  numberEmployees: string;
  yearFounded: number;
};

type JobOffer = {
  availablePositions?: number;
  companyId: string;
  description: string;
  function: string;
  industry: string;
  location: string;
  numberApplicants?: number;
  postDate: Date;
  published: boolean;
  requirements: string[];
  salary?: number;
  workType: string;
};

export { Company, JobOffer };
