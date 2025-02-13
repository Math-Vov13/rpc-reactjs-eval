import { RPCRequest } from '../types/rpc';
import { Task } from '../types/task';

export const taskService = {
  async create({ params }: RPCRequest<Task>) {
    try {
      // Logique de création de tâche
      return { success: true, data: params };
    } catch (error) {
      throw new Error('Failed to create task');
    }
  },

  async get({ params }: RPCRequest<{ id: string }>) {
    try {
      // Logique de récupération de tâche
      return { success: true, data: { id: params.id, title: 'Test Task' } };
    } catch (error) {
      throw new Error('Failed to get task');
    }
  },

  async update({ params }: RPCRequest<Task>) {
    try {
      // Logique de mise à jour de tâche
      return { success: true, data: params };
    } catch (error) {
      throw new Error('Failed to update task');
    }
  },

  async delete({ params }: RPCRequest<{ id: string }>) {
    try {
      // Logique de suppression de tâche
      return { success: true, data: { id: params.id } };
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
};