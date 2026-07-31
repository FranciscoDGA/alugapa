import { LocationRepository } from "@/repositories/LocationRepository";
import { z } from "zod";

const uuidSchema = z.string().uuid("ID inválido");

export class LocationService {
  static async getStates() {
    return LocationRepository.getStates();
  }

  static async getState(slug: string) {
    if (!slug) throw new Error("Slug do estado não informado.");
    const state = await LocationRepository.getStateBySlug(slug);
    if (!state) throw new Error("Estado não encontrado.");
    return state;
  }

  static async getCities(stateId: string) {
    const validId = uuidSchema.parse(stateId);
    return LocationRepository.getCitiesByState(validId);
  }

  static async getCity(slug: string) {
    if (!slug) throw new Error("Slug da cidade não informado.");
    const city = await LocationRepository.getCityBySlug(slug);
    if (!city) throw new Error("Cidade não encontrada.");
    return city;
  }
}
