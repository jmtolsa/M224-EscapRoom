/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LevelStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface GameState {
  currentLevel: number;
  score: number;
  startTime: number | null;
  endTime: number | null;
  status: 'intro' | 'playing' | 'ended';
  history: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  type: 'config' | 'quiz' | 'dns' | 'dhcp' | 'firewall';
  task?: any;
  explanation: string;
}
