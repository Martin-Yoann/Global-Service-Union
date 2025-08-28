'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const presetAmounts = [10, 20, 30, 50, 100, 200, 300, 500];

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectAmount = (value: number) => setAmount(value.toString());

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || isNaN(value) || value <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value }),
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || `Stripe session creation failed (status ${res.status})`);
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      alert(`Something went wrong: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      {/* 标题独立居中 */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-indigo-700 text-center mb-10 tracking-tight"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Support Global Collaboration
      </motion.h1>

      {/* 图片 + 文本 */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* 图片 */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src="/donate-hero.jpg"
            alt="Support Global Cooperation"
            width={600}
            height={400}
            className="rounded-xl w-full object-cover shadow-lg"
            priority
            quality={90}
          />
        </motion.div>

        {/* 文本 */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Your contribution empowers service organizations worldwide to foster transparency, innovation, and sustainable growth.
            Together, we can make a lasting impact.
          </p>

          {/* 捐赠表单 */}
          <form onSubmit={handleDonate} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-3 text-lg">
                Select a Donation Amount
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {presetAmounts.map((val) => (
                  <motion.button
                    key={val}
                    type="button"
                    onClick={() => handleSelectAmount(val)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-3 rounded-lg border text-lg font-semibold transition-all ${
                      amount === val.toString()
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'
                    }`}
                  >
                    ${val}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-lg" htmlFor="amount">
                Or Enter a Custom Amount (USD)
              </label>
              <input
                type="number"
                id="amount"
                step="any"
                min="1"
                placeholder="e.g. 75"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
                disabled={loading}
                inputMode="decimal"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.05, boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}
              whileTap={loading ? {} : { scale: 0.95 }}
              className={`w-full py-3 text-lg font-semibold rounded-lg text-white transition-colors duration-300 ${
                loading
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50'
              }`}
            >
              {loading ? 'Processing Donation...' : `Donate $${amount || 0}`}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Info Cards */}
      <motion.div
        className="mt-20 bg-white rounded-xl px-6 py-12 shadow-md border border-gray-200 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-center text-indigo-700 font-extrabold text-3xl mb-6 tracking-tight">
          🌍 Every Contribution Matters
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-700 text-base md:text-lg leading-relaxed mb-10 px-2">
          Your donation fuels projects that empower service-based organizations across continents — from local initiatives to global networks.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 px-2">
          {cards.map(({ title, description }, i) => (
            <motion.article
              key={i}
              className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200"
              whileHover={{ scale: 1.05, y: -6, boxShadow: '0 10px 15px rgba(99, 102, 241, 0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="text-indigo-600 font-semibold mb-3 text-lg">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.a
            href="/join"
            className="inline-block px-8 py-3 border border-indigo-600 rounded-md text-indigo-600 font-semibold transition-colors duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 select-none"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            💼 Become a Member
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

const cards = [
  { title: '🤝 Community Projects', description: 'Support training, local hubs, and social impact programs for under-resourced service businesses.' },
  { title: '🌐 Digital Access', description: 'Help build open digital platforms for cross-border service collaboration and knowledge sharing.' },
  { title: '📊 Transparency Initiatives', description: 'Contribute to research, open data efforts, and global standards for ethical service practices.' },
];
