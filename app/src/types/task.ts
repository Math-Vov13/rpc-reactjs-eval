export interface Task {
    id?: string;
    title: string;
    description: string;
    userId: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  }