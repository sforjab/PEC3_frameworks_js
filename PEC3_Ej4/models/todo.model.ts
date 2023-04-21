/**
 * @class Model
 *
 * Manages the data of the application.
 */
import { v4 as uuid} from 'uuid';

export class Todo {
  id: string;
  text: string; // ?
  complete: boolean;

  constructor({ text, complete }:{ text: string, complete?: boolean } = { text: '', complete: false }) {
    this.id = uuid();
    this.text = text;
    this.complete = complete ?? false;
  }
}
