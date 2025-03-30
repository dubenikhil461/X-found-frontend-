import { motion } from "framer-motion";
import "./Rules.css";

export default function Rules() {
  return (
    <div className="rules-container">
      <motion.h1
        className="rules-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        X-Found Rules and Regulations
      </motion.h1>

      <div className="rules-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Lost & Found Items
        </motion.h2>
        <motion.div
          className="rules-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ol className="rules-list">
            <li>
              <strong>No Ownership Verification</strong>: X-Found does not
              verify the ownership of any items posted on the platform. We
              operate on a good faith system.
            </li>
            <li>
              <strong>First Come, First Served</strong>: Items reported as found
              will be returned to the first person who claims ownership and can
              reasonably identify the item.
            </li>
            <li>
              <strong>No Guarantees</strong>: X-Found provides no guarantees
              regarding the return of lost items or the authenticity of
              ownership claims.
            </li>
            <li>
              <strong>Platform Limitation</strong>: We serve only as a
              connection platform between those who have lost items and those
              who have found them. X-Found takes no responsibility for the
              actual exchange process.
            </li>
            <li>
              <strong>Identity Protection</strong>: Users are advised to meet in
              public, safe locations when exchanging items. Do not share
              personal information unless necessary.
            </li>
            <li>
              <strong>False Claims</strong>: Users found making false claims
              about lost items may be suspended from the platform.
            </li>
          </ol>
        </motion.div>
      </div>

      <div className="rules-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Item Exchange & Sales
        </motion.h2>
        <motion.div
          className="rules-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ol className="rules-list">
            <li>
              <strong>Second-hand Pricing</strong>: All items sold on the
              platform must be priced reasonably according to:
              <ul>
                <li>Item age and condition</li>
                <li>Original retail price</li>
                <li>Market value for used items</li>
              </ul>
            </li>
            <li>
              <strong>Pricing Transparency</strong>: Sellers must disclose any
              damages, defects, or issues with items being sold.
            </li>
            <li>
              <strong>No Price Gouging</strong>: Selling items at excessively
              inflated prices is prohibited, especially for high-demand items.
            </li>
            <li>
              <strong>Exchange Process</strong>:
              <ul>
                <li>
                  Buyers and sellers are responsible for arranging their own
                  exchange method
                </li>
                <li>
                  X-Found does not facilitate payments or transfers of money
                </li>
                <li>
                  We recommend cash transactions or secure payment methods
                </li>
              </ul>
            </li>
            <li>
              <strong>Quality Assurance</strong>: X-Found does not guarantee the
              quality or condition of items sold. Buyers should inspect items
              before completing transactions.
            </li>
            <li>
              <strong>Prohibited Items</strong>: The following items cannot be
              sold or exchanged on X-Found:
              <ul>
                <li>Illegal items or substances</li>
                <li>Counterfeit or stolen goods</li>
                <li>Dangerous materials</li>
                <li>Academic materials intended for cheating</li>
              </ul>
            </li>
          </ol>
        </motion.div>
      </div>

      <div className="rules-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Platform Disclaimer
        </motion.h2>
        <motion.div
          className="rules-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="disclaimer-text">
            X-Found serves solely as a connection platform for the college
            community. We do not:
          </p>
          <ul className="disclaimer-list">
            <li>Take possession of any items</li>
            <li>Verify authenticity of items or claims</li>
            <li>Guarantee transactions or exchanges</li>
            <li>Process payments</li>
            <li>Mediate disputes between users</li>
            <li>User with inappropriate post will be ban!</li>
          </ul>
          <p className="disclaimer-text">
            Users engage with the platform and other users at their own risk.
            The X-Found team reserves the right to remove any listing or suspend
            any user account that violates these rules.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
