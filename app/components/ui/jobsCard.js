"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";


export function JobCard({
    companyLogo = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&h=100&auto=format&fit=crop",
    companyTitle,
    serviceTitle,
    description,
    timeRange,
    paymentStatus,
    date,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg rounded-xl border-black border p-6 shadow-sm min-w-[360px]"
        >
            <div className="flex items-center gap-3">
                <img
                    src={companyLogo}
                    alt={`${companyTitle} logo`}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <h2 className="text-[24px] font-medium text-black/80">Company Title</h2>
            </div>

            <div className="mt-6 space-y-4">
                <h3 className="text-[20px] font-medium text-gray-900">Service Needed</h3>
                <p className="text-sm text-gray-600">Small description of the service goes here used by persont to understand brief for minute understand of things</p>
            </div>

            <div className="mt-8 flex items-center gap-8 text-gray-600">
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span className="text-base">9AM - 5PM</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-base font-medium">Paid</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-base">9 Feb</span>
                </div>
            </div>
        </motion.div>
    );
}