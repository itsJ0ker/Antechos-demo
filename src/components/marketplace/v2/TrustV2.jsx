import { motion } from 'framer-motion';

const brands = [
  { name: 'Linear', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'Vercel', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg' },
  { name: 'Framer', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Framer_Logo.svg' },
  { name: 'Deel', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Deel_Logo.svg' },
];

export const TrustV2 = () => {
  return (
    <section className="py-20 v2-section-alt border-y border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-[0.3em] mb-12">
          Powering the world's most ambitious teams
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-6 lg:h-8 w-auto dark:invert transition-all"
            >
              <span className="text-xl font-black text-[var(--v2-text-main)]">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
