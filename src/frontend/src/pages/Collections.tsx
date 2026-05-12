import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import { COLLECTIONS } from "../data/products";

export default function Collections() {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <section
        data-ocid="collections.header.section"
        className="bg-card border-b border-border py-16 lg:py-24"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader
            label="VE YRON Collections"
            title="Every Drop, Curated."
            subtitle="Each collection is the result of obsessive craftsmanship and relentless performance engineering. Discover yours."
          />
        </div>
      </section>

      {/* Collections Grid */}
      <section
        data-ocid="collections.grid.section"
        className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24"
      >
        <div className="space-y-24">
          {COLLECTIONS.slice(0, 3).map((collection, i) => {
            const _products: never[] = [];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={collection.handle}
                data-ocid={`collection.item.${i + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Hero Image */}
                <div
                  className={`relative aspect-[4/5] overflow-hidden bg-card ${!isEven ? "lg:col-start-2" : ""}`}
                >
                  <img
                    src={collection.imageUrl}
                    alt={collection.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-uppercase-tight text-primary text-[10px] bg-background/80 border border-primary/30 px-3 py-1.5">
                      {collection.productCount} styles
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col gap-6 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
                >
                  <div>
                    <span className="text-uppercase-tight text-primary mb-3 block">
                      {`Collection 0${i + 1}`}
                    </span>
                    <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight text-foreground">
                      {collection.title}
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-md">
                      {collection.description}
                    </p>
                  </div>

                  {/* Mini product grid — empty since products now come from Shopify */}

                  <Link
                    to="/shop"
                    search={{} as never}
                    data-ocid={`collection.shop.${i + 1}.primary_button`}
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold text-xs tracking-widest uppercase px-8 py-4 w-fit transition-smooth hover:opacity-90 active:scale-95"
                  >
                    Shop {collection.title}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
