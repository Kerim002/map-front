import {
  MapPin,
  Building2,
  Users,
  FileText,
  Phone,
  Mail,
  Eye,
} from "lucide-react";

// Assuming you have these Shadcn components installed
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { TestImageCarusel } from "./test-image-carusel";

// Mock Data (Replace this with data from your API)
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
    name: "Amanow M",
    role: "Safety Inspector",
    image: "/test/images/workers/Amanow M.JPG",
    email: "amanow@example.com",
  },
  {
    id: 3,
    name: "Dovlet B.",
    role: "Logistics Head",
    image: "/avatars/03.png",
    email: "dovlet@example.com",
  },
];

const documents = [
  {
    id: 1,
    name: "Ownership Deed.pdf",
    type: "Legal",
    date: "2023-01-15",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Fire Safety Certificate.pdf",
    type: "Compliance",
    date: "2023-10-10",
    size: "1.1 MB",
  },
  {
    id: 3,
    name: "Q3 Performance Report.xlsx",
    type: "Finance",
    date: "2023-11-01",
    size: "850 KB",
  },
];

export function TestPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background p-8 space-y-6 pt-20">
      {/* --- HEADER SECTION --- */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {facilityData.name}
            </h1>
          </div>
          <p className="flex items-center text-slate-500">
            <MapPin className="mr-1 h-4 w-4" />
            {facilityData.address} • {facilityData.region}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Facility</Button>
          <Button>View on Map</Button>
        </div>
      </div>

      <Separator />

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN (Image & Key Stats) */}
        <div className="md:col-span-1 space-y-6">
          {/* Facility Image Card */}
          <Card className="overflow-hidden dark:bg-slate-800 bg">
            <TestImageCarusel />
            <CardHeader>
              <CardTitle>Facility Overview</CardTitle>
              <CardDescription>Main visual and specifications</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-slate-500">Type</span>
                <span className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" />{" "}
                  {facilityData.type}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-slate-500">Total Area</span>
                <span className="font-medium">{facilityData.area}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Primary Tenant</span>
                <span className="font-medium">{facilityData.company}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (Tabs for Workers, Docs, Details) */}
        <div className="md:col-span-2">
          <Tabs defaultValue="workers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="workers">Workers & Contacts</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* --- WORKERS SECTION --- */}
            <TabsContent value="workers">
              <Card className="dark:bg-slate-800 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Associated Personnel
                  </CardTitle>
                  <CardDescription>
                    People responsible for {facilityData.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workers.map((worker) => (
                    <div
                      key={worker.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            className="object-cover"
                            src={worker.image}
                          />
                          <AvatarFallback>
                            {worker.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
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
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-slate-500"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-slate-500"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    Manage Personnel
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- DOCUMENTS SECTION --- */}
            <TabsContent value="documents">
              <Card className="dark:bg-slate-800 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Legal & Compliance
                  </CardTitle>
                  <CardDescription>
                    All uploaded files related to this property.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between py-3 px-2 border-b last:border-0 hover:bg-slate-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded-md">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-slate-500">
                              {doc.type} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 hidden sm:inline-block">
                            {doc.size}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <Eye className="h-4 w-4 mr-2" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-5xl h-10/12">
                              <DialogTitle className="hidden" />
                              <iframe
                                src="/test/documents/test.pdf"
                                width="100%"
                                height="100%"
                                className="border-none"
                                title="PDF Preview"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6">Upload New Document</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
