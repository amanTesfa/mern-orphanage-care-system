import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Types
type Sponsor = {
  id: number;
  name: string;
  contact: string;
  email: string;
  status: string;
  notes?: string;
};

type Sponsorship = {
  id: number;
  sponsorName: string;
  childName: string;
  startDate: string;
  endDate: string;
  status: string;
  notes?: string;
};

type SponsorContextType = {
  sponsors: Sponsor[];
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  sponsorships: Sponsorship[];
  setSponsorships: React.Dispatch<React.SetStateAction<Sponsorship[]>>;
};

const SponsorContext = createContext<SponsorContextType | undefined>(undefined);

const initialSponsors: Sponsor[] = [
  {
    id: 1,
    name: "Global Aid Foundation",
    contact: "John Doe",
    email: "aid@example.com",
    status: "Active",
    notes: "Major donor",
  },
  {
    id: 2,
    name: "Hope Trust",
    contact: "Jane Smith",
    email: "hope@example.com",
    status: "Inactive",
    notes: "Paused sponsorship",
  },
];

const initialSponsorships: Sponsorship[] = [
  {
    id: 1,
    sponsorName: "Global Aid Foundation",
    childName: "Amina Khan",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "Active",
    notes: "Covers education",
  },
  {
    id: 2,
    sponsorName: "Hope Trust",
    childName: "Samuel Okoro",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "Inactive",
    notes: "Ended early",
  },
];

export const SponsorProvider = ({ children }: { children: ReactNode }) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>(initialSponsorships);

  return (
    <SponsorContext.Provider value={{ sponsors, setSponsors, sponsorships, setSponsorships }}>
      {children}
    </SponsorContext.Provider>
  );
};

export function useSponsorContext() {
  const context = useContext(SponsorContext);
  if (!context) throw new Error("useSponsorContext must be used within SponsorProvider");
  return context;
}
