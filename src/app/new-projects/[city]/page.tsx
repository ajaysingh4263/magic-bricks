import CityListings from "@/components/CityListings";

export default function CityPage({ params }: { params: { city: string } }) {
    return <CityListings city={params.city} />;
}
