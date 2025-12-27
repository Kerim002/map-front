import { TabsContent } from '@/shared/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Mail, Phone, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const workers = [
  {
    id: 1,
    name: "Agaorazow M.",
    role: "Facility Manager",
    image: "/test/images/workers/Agaorazow M.jpg",
    email: "agaorazow@example.com",
  },
  {
    id: 2,
    name: "Amanow M.",
    role: "Safety Inspector",
    image: "/test/images/workers/Amanow M.JPG",
    email: "amanow@example.com",
  },
  {
    id: 3,
    name: "Annagurbanowa G.",
    role: "Logistics Head",
    image: "/test/images/workers/Annagurbanowa G.jpg",
    email: "annagurbanowa@example.com",
  },
];


const facilityData = {
  id: "BLD-921",
  name: "“Parahat” medeni-dynç alyş merkezi",
  type: "Medeni dync alys merkezi",
  status: "Operational",
  region: "Bagtyyarlyk District",
  address: "Magtymguly şaýoly, 98/1 Aşgabat şäheri",
  area: "450 m²",
  image:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Placeholder
  company: "Parahat MDAM",
};

export const FacilityWorkersTab = () => {
  const { t } = useTranslation();

  return (
    <TabsContent value="workers">
      <Card className="dark:bg-slate-800 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> {t("associated-personnel")}
          </CardTitle>
          <CardDescription>{facilityData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PhotoProvider>
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* 3. Wrap the specific image in PhotoView */}
                  <PhotoView src={worker.image}>
                    <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage
                        className="object-cover"
                        src={worker.image}
                        alt={worker.name}
                      />
                      <AvatarFallback>
                        {worker.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </PhotoView>

                  <div>
                    <p className="font-medium text-sm leading-none">
                      {worker.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {worker.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </PhotoProvider>
          <Button variant="outline" className="w-full mt-4">
            {t("manage-personnel")}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
