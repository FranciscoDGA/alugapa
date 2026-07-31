"use server";

import { LocationService } from "@/services/LocationService";

export async function fetchStates() {
  try {
    const states = await LocationService.getStates();
    return { data: states, error: null };
  } catch (error) {
    return { data: null, error: "Falha ao buscar estados" };
  }
}

export async function fetchCitiesByState(stateId: string) {
  try {
    const cities = await LocationService.getCities(stateId);
    return { data: cities, error: null };
  } catch (error) {
    return { data: null, error: "Falha ao buscar cidades" };
  }
}
