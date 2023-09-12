import { Resource } from "./resource.interface"

export interface ProductionValues {
	productionId: number,
	rareMetals: Resource,
	metals: Resource,
	fuels: Resource,
	organics: Resource,
	batteries: Resource,
	explosives: Resource,
	electronics: Resource,
	armor: Resource,
	plastics: Resource,
	food: Resource,
	guns: Resource,
	shipParts: Resource,
	constructionMaterials: Resource,
	researchMaterials: Resource
}
