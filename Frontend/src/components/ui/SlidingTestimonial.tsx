import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { client, urlFor } from "@/lib/sanity/client";
import { NeonGlowOrb } from "@/components/academy/NeonGlowOrb";

interface TestimonialItem {
  name: string;
  profession: string;
  description: string;
  avatar?: string;
  image?: string;
  sanityAvatar?: Parameters<typeof urlFor>[0];
  sanityLogo?: Parameters<typeof urlFor>[0];
  rating?: number;
}

const STATIC_TESTIMONIALS: TestimonialItem[] = [
    {
        name: "Akshay Reddy",
        profession: "Placed at GGF",
        description: "As a B.Com graduate wanting a global corporate career, I had no ERP experience and struggled with MNC interviews. 4AT Academy helped me bridge the gap, training me on live ERP workflows and Excel modeling. Today, I am placed at GGF as a Junior Financial Analyst.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
        image: "/partners/ggf.png",
        rating: 5,
    },
    {
        name: "Mehak Sharma",
        profession: "Placed at Mojler",
        description: "I was a traditional accountant with 2 years of local firm experience, but felt stuck due to lack of exposure to modern automation. 4AT Academy's pathway completely transformed my skill set, teaching me RPA and Power BI dashboarding. I have now joined Mojler as an Automation Specialist.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
        image: "/partners/mojler.png",
        rating: 5,
    },
    {
        name: "Harish Nair",
        profession: "Placed at Burkland",
        description: "I struggled to break into FP&A roles despite standard certification because I lacked hands-on experience in forecasting. The corporate modeling drills and direct director mentorship at 4AT Academy gave me the exact skills I needed. I'm proud to be placed at Burkland as an FP&A Associate.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
        image: "/partners/burkland.svg",
        rating: 5,
    },
    {
        name: "Priya Verma",
        profession: "Placed at Caranium",
        description: "As an accounting fresher, US taxation seemed overwhelming, and I had no knowledge of IRS filings. At 4AT Academy, I trained directly on mock tax cases and global reporting standards. It directly led to me being hired by Caranium as a Tax Consultant.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80",
        image: "/partners/caranium.png",
        rating: 5,
    },
];

const FUITestimonialWithSlide = React.memo(function FUITestimonialWithSlide() {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(STATIC_TESTIMONIALS);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const query = `*[_type == "testimonial"] {
                    name,
                    profession,
                    description,
                    "sanityAvatar": avatar,
                    "sanityLogo": companyLogo,
                    rating
                }`;
                const data = await client.fetch<TestimonialItem[]>(query);
                if (data && data.length > 0) {
                    const sanityNames = new Set(data.map((member) => member.name));
                    const uniqueStatic = STATIC_TESTIMONIALS.filter(m => !sanityNames.has(m.name));
                    setTestimonials([...uniqueStatic, ...data]);
                }
            } catch (err) {
                console.warn("Failed to fetch testimonials from Sanity, using static fallback:", err);
            }
        }
        fetchTestimonials();
    }, []);

    // Duplicate list to achieve seamless infinite marquee loop
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <div className="max-w-[1440px] mx-auto w-full">
            <div className="w-full mx-auto px-4 md:px-10">
                <div id="testimonials-heading" className="mb-16 text-center flex flex-col items-center relative">
                    <NeonGlowOrb 
                      className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                      size={450}
                      opacity={0.18}
                      blur={50}
                    />
                    <span className="section-eyebrow relative z-10">
                        TESTIMONIALS
                    </span>
                    <h2 className="section-title text-center max-w-3xl mx-auto relative z-10">
                        Career transformations from learners who moved into finance <span className="font-serif italic text-accent">roles</span>.
                    </h2>
                    <p className="section-desc text-center mt-6 max-w-xl mx-auto relative z-10">
                        Alumni stories repeatedly point to the same shift: structured mentorship, real-world cases, and placement support.
                    </p>
                </div>
                <div style={{
                    maskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                    WebkitMaskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                }}  className="flex relative overflow-hidden shrink-0 max-w-full">
                  <div className="flex animate-x-slider gap-5 w-max py-4">
                    {duplicatedTestimonials.map((testimonial, indx) => {
                        const avatarUrl = testimonial.sanityAvatar 
                            ? urlFor(testimonial.sanityAvatar).url()
                            : testimonial.avatar;
                        const logoUrl = testimonial.sanityLogo
                            ? urlFor(testimonial.sanityLogo).url()
                            : testimonial.image;
                        return (
                            <div key={indx} className="border border-[#151e2e] flex flex-col bg-[#121212] rounded-2xl shrink-0 grow-0 w-[300px] sm:w-[480px] md:w-[580px] h-full justify-between overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.5)] hover:border-[#151e2e] hover-fine:bg-[#1a1a1a] transition-all duration-300">
                                <p className="px-6 py-6 text-pretty text-body font-normal text-ink-secondary font-sans leading-relaxed">
                                    &quot;{testimonial.description}&quot;
                                </p>
                                <div className="border-t border-white/8 w-full flex items-stretch overflow-hidden">
                                    <div className="flex-1 flex gap-3 items-center px-4 py-3">
                                        {avatarUrl && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-white/10 shrink-0">
                                                <Image src={avatarUrl} fill sizes="32px" className="object-cover animate-fade-in" alt={testimonial.name} />
                                            </div>
                                        )}
                                        <div className="flex flex-col flex-1 gap-0 justify-start items-start">
                                            <h5 className="text-small font-semibold text-white font-sans">{testimonial.name}</h5>
                                            <p className="text-ink-secondary text-xs mt-[-2px] font-sans">{testimonial.profession}</p>
                                        </div>
                                    </div>
                                    <div className="w-[1px] bg-white/8 self-stretch" />
                                    {logoUrl && (
                                        <div className="w-[110px] sm:w-[130px] flex items-center justify-center px-4 py-3 self-stretch shrink-0 bg-white/[0.02] relative">
                                            <Image src={logoUrl} fill sizes="(max-width: 640px) 110px, 130px" className="object-contain brightness-0 invert opacity-60 p-4" alt={testimonial.name + " logo"} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                  </div>
                </div>
            </div>
        </div>
    );
});

FUITestimonialWithSlide.displayName = "FUITestimonialWithSlide";

export default FUITestimonialWithSlide;
