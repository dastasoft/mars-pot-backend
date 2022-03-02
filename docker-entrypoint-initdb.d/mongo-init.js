db = new Mongo().getDB('data')

db.createCollection('users', { capped: false })
db.createCollection('companies', { capped: false })
db.createCollection('jobs', { capped: false })

db.users.insert([
  {
    email: 'dastasoft@protonmail.com',
    firstName: 'Daniel',
    password: '$2b$10$764xE8aohGTcaB9HFQF3meIEZeYWMI3GoFaddQqHu4D7Ym40nYI9u',
    username: 'dastasoft',
  },
])

db.companies.insert([
  {
    name: 'Capsule Corp',
    about: 'Like WinRAR but we accept more file extensions.',
    industries: ['automobile', 'house', 'engineering'],
    numberEmployees: 2,
    yearFounded: 1990,
  },
  {
    name: 'Red Ribbon',
    about: 'We deliver the best Android you can ever had',
    industries: ['militar', 'artificial intelligence', 'engineering'],
    numberEmployees: 2000,
    yearFounded: 1000,
  },
])

const { _id } = db.companies.find().pretty()[0]

db.jobs.insert([
  {
    availablePositions: 10,
    companyId: _id,
    description: 'Senior Radar Engineer',
    function: 'Develop a trusty and reliable green radar.',
    industry: 'engineering',
    location: 'Tempe Terra, Mars',
    numberApplicants: 9,
    postDate: '2021-07-12T11:33:51.563Z',
    published: true,
    requirements: [
      'At least three years of experience with Radar related hardware and Radar.js framework.',
    ],
    salary: 40000,
    workType: 'full time',
  },
])
