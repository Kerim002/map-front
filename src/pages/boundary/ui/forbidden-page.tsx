import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export const ForbiddenPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-red-600">403</CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Forbidden Access
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500 mb-6">
            Oops! You don't have permission to access this page.
          </p>
          <Button asChild className=" transition-colors">
            <a href="/">Return to Home</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
