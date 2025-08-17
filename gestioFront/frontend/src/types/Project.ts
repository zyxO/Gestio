export interface Project {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    description: string;    
    createdAt: string;
    updatedAt: string;
    tasks: string[];
    users: string[];
    comments: string[];
    status: number;
    iri: string;
}