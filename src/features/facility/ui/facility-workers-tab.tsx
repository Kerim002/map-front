import { TabsContent } from '@/shared/ui/tabs'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {  Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/entities/employee/api/employee.api';
// import { facilityApi } from '@/entities/facility/api/facility.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { storageUrlCreate } from '@/shared/lib/storage-url-create';



export const FacilityWorkersTab = () => {
  const { t } = useTranslation();
  const { facilityId } = useParams()
  // const { data: facilityData } = useQuery(facilityApi.detail(facilityId))
  const naviagte = useNavigate()
  const { data } = useQuery(
    employeeApi.list({ limit: 12, page: 1, location_id: facilityId ?? "" })
  );


    // const getImageUrl = (id: string) =>
    // `http://216.250.12.42:9000/location-image/${id}/xmd.webp`;

  return (
    <TabsContent value="workers">
      <Card className="dark:bg-slate-800 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> {t("associated-personnel")}
          </CardTitle>
          {/* <CardDescription>{facilityData?.name}</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <PhotoProvider>
            {data?.data.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* 3. Wrap the specific image in PhotoView */}
                  <PhotoView src={worker.avatarUrl ?? ""}>
                    <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage
                        className="object-cover"
                        src={storageUrlCreate('user', worker.avatarUrl ?? "" , 'md')}
                        alt={worker.firstName}
                      />
                      <AvatarFallback>
                        {worker.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </PhotoView>

                  <div>
                    <div className='flex items-center gap-2'>

                      <p className="font-medium text-sm leading-none">
                        {worker.firstName}
                      </p>
                      <p className="font-medium text-sm leading-none">
                        {worker.lastName}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {worker.position}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{worker.phone}</p>


                </div>
              </div>
            ))}
          </PhotoProvider>
          <Button onClick={() => naviagte("employee/1")} variant="outline" className="w-full mt-4">
            {t("manage-personnel")}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
