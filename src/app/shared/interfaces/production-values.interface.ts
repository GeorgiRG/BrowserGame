import { Resource } from "./resource.interface"

export interface ProductionValues {
	ProductionId: number,
	RareMetals: Resource,
	Metals: Resource,
	Fuels: Resource,
	Organics: Resource,
	Batteries: Resource,
	Explosives: Resource,
	Electronics: Resource,
	Armor: Resource,
	Plastics: Resource,
	Food: Resource,
	Guns: Resource,
	ShipParts: Resource,
	ConstructionMaterials: Resource,
	ResearchMaterials: Resource
}
