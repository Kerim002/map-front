import { FacilityImageCarusel } from "@/features/facility/ui/facility-image-carusel";
import { FacilityDetails } from "./facility-details";

export const FacilityInfo = () => {
    return (
        <div className="p-6  border border-border/50 rounded-[3rem] bg-card/60 backdrop-blur-md shadow-2xl shadow-primary/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                    <div className="overflow-hidden shadow-2xl relative">
                        <FacilityImageCarusel />
                    </div>
                    {/* Data under carousel */}
                    <div className="animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
                        <FacilityDetails filter="extra" />
                    </div>
                </div>
                <div className="lg:col-span-7 xl:col-span-8">
                    <FacilityDetails filter="main" />
                </div>
            </div>
        </div>
    )
}
