"use client";

import { useFadeInUp } from "@/app/[locale]/utils/animations/useFadeInUp";
import { useScaleIn } from "@/app/[locale]/utils/animations/useScaleIn";
import Image from "next/image";
export default function PropertyCard({ property }: { property: any }) {
  // Use multiple animations on different elements
  useFadeInUp({
    elementIds: ["property-title", "property-price"],
    delay: 0.3,
    stagger: 0.2,
  });

  useScaleIn({
    elementIds: ["property-image"],
    delay: 0.1,
    fromScale: 0.9,
  });

  return (
    <div className="property-card">
      <div id="property-image" className="relative h-[300px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 id="property-title" className="text-2xl font-bold mt-4">
        {property.title}
      </h3>
      <p id="property-price" className="text-xl text-primary">
        ${property.price}
      </p>
    </div>
  );
}
