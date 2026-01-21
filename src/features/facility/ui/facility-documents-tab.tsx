import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Loader2, Upload, Download } from 'lucide-react';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { TabsContent } from "@/shared/ui/tabs";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";

import { facilityApi } from "@/entities/facility/api/facility.api";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import { useUploadFacilityFile } from "../hook/use-upload-facility-file";

// Helper: Format bytes to readable size
const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Helper: Get Icon based on MimeType
const getFileIcon = (mime: string) => {
  if (mime.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />;
  if (mime.includes("image")) return <FileText className="h-5 w-5 text-green-500" />;
  if (mime.includes("spreadsheetml") || mime.includes("excel")) return <FileText className="h-5 w-5 text-emerald-600" />;
  if (mime.includes("word") || mime.includes("officedocument")) return <FileText className="h-5 w-5 text-blue-600" />;
  return <FileText className="h-5 w-5 text-slate-400" />;
};

export const FacilityDocumentsTab = () => {
  const { t } = useTranslation();
  const { facilityId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Data
  const { data, isLoading: isFetching } = useQuery(
    facilityApi.folders({ limit: 20, location_id: facilityId!, page: 1 })
  );

  // 2. Upload Mutation
  const { mutate: uploadFiles, isPending: isUploading } = useUploadFacilityFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && facilityId) {
      uploadFiles({
        location_id: facilityId,
        files: Array.from(e.target.files)
      }, {
        onSuccess: () => {
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      });
    }
  };

  const getFileUrl = (path: string) =>
    `http://216.250.12.42:9000/location-files/${path}`;

  return (
    <TabsContent value="documents">
      <Card className="dark:bg-slate-800 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5 text-primary" /> {t("legal-and-compliance")}
          </CardTitle>
          <CardDescription>
            {t("docs-description")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Hidden Input */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="space-y-1 min-h-[200px]">
            {isFetching && (
              <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-500">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm">{t("loading-documents")}...</p>
              </div>
            )}

            {!isFetching && data?.data.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500">{t("no-documents-uploaded")}</p>
              </div>
            )}

            {data?.data.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-3 px-3 border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    {getFileIcon(doc.mimeType)}
                  </div>
                  <div>
                    <p className="font-medium text-sm truncate max-w-[200px] sm:max-w-[400px]">
                      {doc.name}
                    </p>
                    <p className="text-[11px] text-slate-500 uppercase font-bold tracking-tight">
                      {formatSize(doc.size)} • {formatToDDMMYYYY(doc.updatedAt, true)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                    <a
                      href={getFileUrl(doc.url ?? "")}
                      download={doc.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden">
                      <div className="p-4 border-b flex justify-between items-center bg-white dark:bg-slate-900">
                        <DialogTitle className="text-base font-medium truncate pr-4">
                          {doc.name}
                        </DialogTitle>
                        {doc.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.url} download>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </a>
                          </Button>
                        )}
                      </div>

                      <div className="flex-1 bg-slate-50 dark:bg-slate-950 relative">
                        {doc.url ? (
                          <DocViewer
                            documents={[{ uri: doc.url, fileName: doc.name }]}
                            pluginRenderers={DocViewerRenderers}
                            theme={{
                                disableThemeScrollbar: true,
                            }}
                            config={{
                                header: { disableHeader: true }
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3 p-6 text-center">
                            <FileWarning className="h-12 w-12 opacity-20" />
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Preview unavailable</p>
                                <p className="text-sm">This file is processing or requires download to view.</p>
                            </div>
                            <Button variant="secondary" asChild>
                                <a href={doc.url || "#"} download>Download to Local Device</a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog> */}
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-6 shadow-sm"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isUploading ? t("uploading") : t("upload-new-document")}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};