import type { MyAccountData } from "@/features/my_account/types";

export async function getMockMyAccountData(): Promise<MyAccountData> {
  return {
    firstName: "Motif",
    lastName: "Studios",
    email: "motif.studios.nz@gmail.com",
    // isGoogleConnected: true,
  };
}