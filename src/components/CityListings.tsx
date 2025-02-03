"use client";

import { useEffect, useState } from "react";
import CardComponent from "@/components/CardComponent";

export default function CityListings({ city }: { city: string }) {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchListings() {
            try {
                const res = await fetch(`/api/scrape?city=${city}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setListings(data.listings);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, [city]);

    if (loading) return <p>Loading projects for {city.replace("-", " ")}...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold capitalize">
                New Projects in {city.replace("-", " ")}
            </h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <CardComponent key={listing.id} listing={listing} />
                    ))
                ) : (
                    <p>No projects found in {city.replace("-", " ")}</p>
                )}
            </div>
        </div>
    );
}
