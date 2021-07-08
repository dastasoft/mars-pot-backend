type Company = {
    about: string
    industries: string[],
    name: string,
    numberEmployees: string,
    yearFounded: number,
}

type JobOffer = {
    availablePositions: number
    company: Company,
    description: string,
    function: string,
    industry: string,
    location: string,
    numberApplicants: number
    postDate: Date,
    requirements: string[],
    salary: number,
    workType: string,
}

export {Company, JobOffer}