import ResourceManager from '../../components/admin/ResourceManager';
import {
  projects,
  skills,
  experience,
  education,
  certifications,
} from '../../services/portfolioService';
import { monthYear } from '../../utils/format';
const projectFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'slug', label: 'URL slug', required: true },
  {
    name: 'shortDescription',
    label: 'Short description',
    type: 'textarea',
    full: true,
    required: true,
  },
  { name: 'longDescription', label: 'Full description', type: 'textarea', full: true },
  { name: 'image', label: 'Cover image URL', type: 'url', full: true },
  { name: 'screenshots', label: 'Screenshot URLs', type: 'array', full: true },
  { name: 'technologies', label: 'Technologies', type: 'array' },
  { name: 'features', label: 'Key features', type: 'array' },
  { name: 'githubUrl', label: 'Frontend GitHub URL', type: 'url' },
  { name: 'githubBackendUrl', label: 'Backend GitHub URL (optional)', type: 'url' },
  { name: 'liveUrl', label: 'Live demo URL', type: 'url' },
  { name: 'featured', label: 'Featured project', type: 'checkbox' },
  { name: 'order', label: 'Display order', type: 'number', min: '0', default: 0 },
];
const skillFields = [
  { name: 'name', label: 'Skill name', required: true },
  {
    name: 'category',
    label: 'Category',
    required: true,
    options: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
  },
  { name: 'icon', label: 'Icon / emoji' },
  { name: 'order', label: 'Display order', type: 'number', min: '0', default: 0 },
];
const experienceFields = [
  { name: 'jobTitle', label: 'Job title', required: true },
  { name: 'company', label: 'Company', required: true },
  {
    name: 'employmentType',
    label: 'Employment type',
    required: true,
    options: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Academic', 'Other'],
  },
  { name: 'startDate', label: 'Start date', type: 'date', required: true },
  { name: 'endDate', label: 'End date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
  { name: 'responsibilities', label: 'Responsibilities', type: 'array', full: true },
  { name: 'technologies', label: 'Technologies', type: 'array' },
  { name: 'order', label: 'Display order', type: 'number', min: '0', default: 0 },
];
const educationFields = [
  { name: 'degree', label: 'Degree', required: true },
  { name: 'program', label: 'Program' },
  { name: 'school', label: 'School', required: true },
  { name: 'startYear', label: 'Start year', type: 'number', required: true },
  { name: 'endYear', label: 'End year', type: 'number' },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
  { name: 'achievements', label: 'Achievements', type: 'array', full: true },
  { name: 'order', label: 'Display order', type: 'number', min: '0', default: 0 },
];
const certificationFields = [
  { name: 'title', label: 'Certification title', required: true },
  { name: 'organization', label: 'Organization', required: true },
  { name: 'date', label: 'Date earned', type: 'date', required: true },
  { name: 'credentialUrl', label: 'Credential URL', type: 'url', full: true },
  { name: 'image', label: 'Certificate image URL', type: 'url', full: true },
  { name: 'order', label: 'Display order', type: 'number', min: '0', default: 0 },
];
export const ProjectsAdmin = () => (
  <ResourceManager
    title="Projects"
    description="Showcase your strongest work and case studies."
    service={projects}
    fields={projectFields}
    columns={[
      { key: 'title', label: 'Project' },
      { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
      { key: 'order', label: 'Order' },
    ]}
    empty="No projects yet. Add your first project."
  />
);
export const SkillsAdmin = () => (
  <ResourceManager
    title="Skills"
    description="Organize your technical abilities into categories."
    service={skills}
    fields={skillFields}
    columns={[
      { key: 'name', label: 'Skill' },
      { key: 'category', label: 'Category' },
      { key: 'order', label: 'Order' },
    ]}
    empty="No skills yet."
  />
);
export const ExperienceAdmin = () => (
  <ResourceManager
    title="Experience"
    description="Manage professional, freelance, internship, or academic work."
    service={experience}
    fields={experienceFields}
    columns={[
      { key: 'jobTitle', label: 'Role' },
      { key: 'company', label: 'Company' },
      {
        key: 'startDate',
        label: 'Period',
        render: (r) => `${monthYear(r.startDate)} — ${monthYear(r.endDate)}`,
      },
      { key: 'employmentType', label: 'Type' },
    ]}
    empty="No experience records yet."
  />
);
export const EducationAdmin = () => (
  <ResourceManager
    title="Education"
    description="Add your schools, qualifications, and achievements."
    service={education}
    fields={educationFields}
    columns={[
      { key: 'degree', label: 'Qualification' },
      { key: 'school', label: 'School' },
      {
        key: 'startYear',
        label: 'Years',
        render: (r) => `${r.startYear} — ${r.endYear || 'Present'}`,
      },
    ]}
    empty="No education records yet."
  />
);
export const CertificationsAdmin = () => (
  <ResourceManager
    title="Certifications"
    description="Manage your completed courses and professional credentials."
    service={certifications}
    fields={certificationFields}
    columns={[
      { key: 'title', label: 'Certification' },
      { key: 'organization', label: 'Organization' },
      { key: 'date', label: 'Date', render: (r) => new Date(r.date).getFullYear() },
    ]}
    empty="No certifications yet."
  />
);
