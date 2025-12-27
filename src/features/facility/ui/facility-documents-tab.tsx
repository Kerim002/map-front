
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {  TabsContent } from "@/shared/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Eye, FileText } from 'lucide-react';
import { useTranslation } from "react-i18next";

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
export const FacilityDocumentsTab = () => {
          const { t } = useTranslation();
    
  return (
     <TabsContent value="documents">
              <Card className="dark:bg-slate-800 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" /> {t("legal-and-compliance")}
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
                                <Eye className="h-4 w-4 mr-2" /> {t("view")}
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
                  <Button className="w-full mt-6">
                    {t("upload-new-document")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
  )
}
