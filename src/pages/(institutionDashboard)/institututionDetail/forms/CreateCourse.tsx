import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCourseMutation } from "@/redux/institution/institutionApi";

export default function CreateCourse() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [createCourse, { isLoading, isError, isSuccess }] = useCreateCourseMutation();
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [isFaceToFace, setIsFaceToFace] = useState();
    const [isOnline, setIsOnline] = useState();
    const [fee, setFee] = useState<number | "">("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const createCourseHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        await createCourse({
            name: courseName,
            institution: id,
            description: courseDescription,
            is_facetoface: isFaceToFace,
            is_online: isOnline,
            fee: fee === "" ? null : fee,
            start_date: startDate || null,
            finish_date: finishDate || null,
        });

        if (isSuccess) {
            console.log("Kurs başarıyla oluşturuldu");
            navigate(`/dashboard/institution-detail/${id}`);
        }
    };

    return (
        <div className="flex gap-6 flex-col items-center justify-center font-kanit">
            <h1 className="text-2xl text-center md:w-1/2 w-full">
                Yeni bir kurs oluşturun
            </h1>
            <Card className="md:w-1/2 w-full">
                <CardHeader></CardHeader>
                <CardContent>
                    <form >
                        <div className="grid w-full items-center gap-4">
                            <Label htmlFor="courseName">Kurs Adı</Label>
                            <Input
                                id="courseName"
                                name="name"
                                placeholder="Kurs Adını Giriniz"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <Label htmlFor="courseDescription">Açıklama</Label>
                            <Input
                                id="courseDescription"
                                name="description"
                                placeholder="Kurs Açıklaması"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                            />
                            <Label htmlFor="fee">Ücret</Label>
                            <Input
                                id="fee"
                                name="fee"
                                type="number"
                                placeholder="Kurs Ücreti (opsiyonel)"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                            />
                            <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                            <Input
                                id="startDate"
                                name="start_date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Label htmlFor="finishDate">Bitiş Tarihi</Label>
                            <Input
                                id="finishDate"
                                name="finish_date"
                                type="date"
                                value={finishDate}
                                onChange={(e) => setFinishDate(e.target.value)}
                            />

                            <div className="flex items-center gap-4">
                                <Checkbox
                                    id="isFaceToFace"
                                    checked={isFaceToFace}
                                    onChange={() => setIsFaceToFace(!isFaceToFace)}
                                />
                                <Label htmlFor="isFaceToFace">Yüz Yüze</Label>
                            </div>
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    id="isOnline"
                                    checked={isOnline}
                                    onChange={() => setIsOnline(!isOnline)}
                                />
                                <Label htmlFor="isOnline">Online</Label>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={createCourseHandler}
                        className={isLoading ? "bg-gray-400" : "bg-primary"}
                    >
                        Oluştur
                    </Button>
                </CardFooter>
                {isError && <p className="text-red-500 text-center mb-3">Bir hata oluştu. Lütfen tekrar deneyin.</p>}
            </Card>
        </div>
    );
}
