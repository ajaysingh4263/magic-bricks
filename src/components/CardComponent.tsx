import Link from "next/link";

export default function CardComponent({ listing }: { listing: any }) {
    return (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden border">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-2/5">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Section: Details */}
            <div className="flex flex-col p-4 w-full md:w-3/5">
                {/* Project Title & Location */}
                <h2 className="text-xl font-bold text-gray-900">{listing.title}</h2>
                <p className="text-gray-600">{listing.location}</p>

                {/* Price & Status */}
                <p className="text-lg font-semibold text-red-500">
                    {listing.price}
                </p>
                <p className="text-sm text-gray-500">{listing.status}</p>

                {/* Expert Reviews & Reports */}
                <div className="flex gap-4 mt-4">
                    <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                        <span className="font-semibold">Expert Reviews & Advice</span>
                    </div>
                    <div className="bg-yellow-100 px-3 py-1 rounded text-sm">
                        <span className="font-semibold">RERA Reports</span>
                    </div>
                </div>

                {/* Amenities */}
                <p className="mt-2 text-sm text-gray-500">
                    <span className="font-semibold">Amenities:</span> {listing.amenities}
                </p>

                {/* CTA Buttons */}
                <div className="mt-4 flex gap-3">
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Contact Builder
                    </button>
                    <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50">
                        Download Brochure
                    </button>
                </div>
            </div>
        </div>
    );
}
