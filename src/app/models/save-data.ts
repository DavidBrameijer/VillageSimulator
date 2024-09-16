import { Improvement } from "./improvement";

export interface SaveData {
	improvements: Improvement[];
	resources: Map<string, number>;
}
