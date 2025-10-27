import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Users,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Bell,
  Repeat,
} from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "../ui/button";

interface FamilyTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  category: "منزلية" | "أطفال" | "مالية" | "صحية" | "اجتماعية" | "أخرى";
  priority: "عالية" | "متوسطة" | "منخفضة";
  dueDate: Date;
  dueTime?: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  recurring: "none" | "daily" | "weekly" | "monthly";
  reminder: boolean;
  notes?: string;
}

const FamilyTaskScheduler = () => {
  const [tasks, setTasks] = useState<FamilyTask[]>([
    {
      id: "1",
      title: "تنظيف المنزل",
      description: "تنظيف شامل للبيت مع التركيز على الغرف الرئيسية",
      assignedTo: "ماما",
      category: "منزلية",
      priority: "متوسطة",
      dueDate: new Date(),
      dueTime: "10:00",
      status: "pending",
      recurring: "weekly",
      reminder: true,
    },
    {
      id: "2",
      title: "متابعة واجبات الأطفال",
      description: "مراجعة الواجبات المدرسية ومساعدة الأطفال",
      assignedTo: "بابا",
      category: "أطفال",
      priority: "عالية",
      dueDate: addDays(new Date(), 1),
      dueTime: "19:00",
      status: "in-progress",
      recurring: "daily",
      reminder: true,
    },
    {
      id: "3",
      title: "دفع الفواتير",
      description: "دفع فواتير الكهرباء والماء والإنترنت",
      assignedTo: "بابا",
      category: "مالية",
      priority: "عالية",
      dueDate: addDays(new Date(), 3),
      status: "pending",
      recurring: "monthly",
      reminder: true,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [weekView, setWeekView] = useState(true);
  const [newTask, setNewTask] = useState<Partial<FamilyTask>>({
    category: "منزلية",
    priority: "متوسطة",
    status: "pending",
    recurring: "none",
    reminder: true,
    dueDate: new Date(),
  });

  const familyMembers = ["بابا", "ماما", "أحمد", "فاطمة", "يوسف"];

  const categoryColors = {
    منزلية: "bg-primary/10 text-primary border-primary/20",
    أطفال: "bg-warm/10 text-warm border-warm/20",
    مالية: "bg-success/10 text-success border-success/20",
    صحية: "bg-accent/10 text-accent border-accent/20",
    اجتماعية: "bg-secondary/10 text-secondary border-secondary/20",
    أخرى: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
  };

  const priorityColors = {
    عالية: "bg-destructive/10 text-destructive border-destructive/20",
    متوسطة: "bg-accent/10 text-accent border-accent/20",
    منخفضة:
      "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
  };

  const statusColors = {
    pending: "bg-muted/10 text-muted-foreground border-muted/20",
    "in-progress": "bg-accent/10 text-accent border-accent/20",
    completed: "bg-success/10 text-success border-success/20",
    overdue: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 6 }); // Saturday
    const end = endOfWeek(selectedDate, { weekStartsOn: 6 });
    return eachDayOfInterval({ start, end });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      (task) => task.dueDate.toDateString() === date.toDateString()
    );
  };

  const addTask = () => {
    if (newTask.title && newTask.assignedTo) {
      const task: FamilyTask = {
        ...newTask,
        id: Date.now().toString(),
        title: newTask.title || "",
        description: newTask.description || "",
        assignedTo: newTask.assignedTo || familyMembers[0],
        category: newTask.category || "منزلية",
        priority: newTask.priority || "متوسطة",
        dueDate: newTask.dueDate || new Date(),
        status: newTask.status || "pending",
        recurring: newTask.recurring || "none",
        reminder: newTask.reminder || true,
      };

      setTasks([...tasks, task]);
      setNewTask({
        category: "منزلية",
        priority: "متوسطة",
        status: "pending",
        recurring: "none",
        reminder: true,
        dueDate: new Date(),
      });
      setShowAddForm(false);
    }
  };

  const updateTaskStatus = (id: string, status: FamilyTask["status"]) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: "قيد الانتظار",
      "in-progress": "قيد التنفيذ",
      completed: "مكتملة",
      overdue: "متأخرة",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
          <CalendarIcon className="h-4 w-4" />
          جدولة المهام العائلية
        </div>
        <h2 className="text-3xl font-bold">تنظيم المهام الأسرية</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نظم وزع المهام اليومية والأسبوعية بين أفراد الأسرة بطريقة ذكية ومنظمة
        </p>
      </div>

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={weekView ? "default" : "outline"}
            onClick={() => setWeekView(true)}
            size="sm"
          >
            عرض أسبوعي
          </Button>
          <Button
            variant={!weekView ? "default" : "outline"}
            onClick={() => setWeekView(false)}
            size="sm"
          >
            عرض يومي
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(selectedDate, "yyyy/MM/dd", { locale: ar })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                locale={ar}
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => setShowAddForm(true)}
            variant="planning"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{tasks.length}</div>
          <div className="text-sm text-muted-foreground">إجمالي المهام</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-success">
            {tasks.filter((t) => t.status === "completed").length}
          </div>
          <div className="text-sm text-muted-foreground">مهام مكتملة</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-accent">
            {tasks.filter((t) => t.status === "in-progress").length}
          </div>
          <div className="text-sm text-muted-foreground">قيد التنفيذ</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-destructive">
            {tasks.filter((t) => t.status === "overdue").length}
          </div>
          <div className="text-sm text-muted-foreground">متأخرة</div>
        </Card>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="planning-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              إضافة مهمة جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان المهمة</Label>
                <Input
                  id="title"
                  value={newTask.title || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="مثال: تنظيف المنزل"
                />
              </div>
              <div className="space-y-2">
                <Label>المسؤول</Label>
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, assignedTo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فرد من الأسرة" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={newTask.description || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="تفاصيل إضافية عن المهمة"
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>الفئة</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, category: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="منزلية">منزلية</SelectItem>
                    <SelectItem value="أطفال">أطفال</SelectItem>
                    <SelectItem value="مالية">مالية</SelectItem>
                    <SelectItem value="صحية">صحية</SelectItem>
                    <SelectItem value="اجتماعية">اجتماعية</SelectItem>
                    <SelectItem value="أخرى">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الأولوية</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, priority: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عالية">عالية</SelectItem>
                    <SelectItem value="متوسطة">متوسطة</SelectItem>
                    <SelectItem value="منخفضة">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>التكرار</Label>
                <Select
                  value={newTask.recurring}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, recurring: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">لا يتكرر</SelectItem>
                    <SelectItem value="daily">يومياً</SelectItem>
                    <SelectItem value="weekly">أسبوعياً</SelectItem>
                    <SelectItem value="monthly">شهرياً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>التاريخ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {newTask.dueDate
                        ? format(newTask.dueDate, "yyyy/MM/dd", { locale: ar })
                        : "اختر التاريخ"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) =>
                        setNewTask({ ...newTask, dueDate: date || new Date() })
                      }
                      locale={ar}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">الوقت (اختياري)</Label>
                <Input
                  id="time"
                  type="time"
                  value={newTask.dueTime || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
              <Button variant="planning" onClick={addTask}>
                إضافة المهمة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks Display */}
      {weekView ? (
        /* Week View */
        <div className="space-y-4">
          <h3 className="text-xl font-bold">المهام الأسبوعية</h3>
          <div className="grid gap-4">
            {getWeekDays().map((day, index) => {
              const dayTasks = getTasksForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <Card
                  key={index}
                  className={`p-4 ${isToday ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">
                        {format(day, "EEEE", { locale: ar })}
                      </h4>
                      <span className="text-muted-foreground">
                        {format(day, "dd/MM", { locale: ar })}
                      </span>
                      {isToday && (
                        <Badge variant="default" className="text-xs">
                          اليوم
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {dayTasks.length} مهام
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dayTasks.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        لا توجد مهام لهذا اليوم
                      </p>
                    ) : (
                      dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateTaskStatus(
                                  task.id,
                                  task.status === "completed"
                                    ? "pending"
                                    : "completed"
                                )
                              }
                              className={
                                task.status === "completed"
                                  ? "text-success"
                                  : "text-muted-foreground"
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-medium ${
                                    task.status === "completed"
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  {task.title}
                                </span>
                                <Badge
                                  className={categoryColors[task.category]}
                                  variant="outline"
                                >
                                  {task.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {task.assignedTo}
                                {task.dueTime && (
                                  <>
                                    <Clock className="h-3 w-3 mr-1" />
                                    {task.dueTime}
                                  </>
                                )}
                                {task.reminder && (
                                  <Bell className="h-3 w-3 text-accent" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={statusColors[task.status]}
                              variant="outline"
                            >
                              {getStatusText(task.status)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteTask(task.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        /* Day View */
        <div className="space-y-4">
          <h3 className="text-xl font-bold">
            مهام يوم {format(selectedDate, "EEEE dd MMMM yyyy", { locale: ar })}
          </h3>

          <div className="grid gap-4">
            {getTasksForDate(selectedDate).map((task) => (
              <Card key={task.id} className="planning-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateTaskStatus(
                            task.id,
                            task.status === "completed"
                              ? "pending"
                              : "completed"
                          )
                        }
                        className={
                          task.status === "completed"
                            ? "text-success"
                            : "text-muted-foreground"
                        }
                      >
                        <CheckCircle className="h-5 w-5" />
                      </Button>
                      <div>
                        <h4
                          className={`text-lg font-bold ${
                            task.status === "completed"
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {task.assignedTo}
                    </div>
                    {task.dueTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {task.dueTime}
                      </div>
                    )}
                    {task.recurring !== "none" && (
                      <div className="flex items-center gap-1">
                        <Repeat className="h-4 w-4" />
                        {task.recurring === "daily"
                          ? "يومياً"
                          : task.recurring === "weekly"
                          ? "أسبوعياً"
                          : "شهرياً"}
                      </div>
                    )}
                    {task.reminder && <Bell className="h-4 w-4 text-accent" />}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Badge
                      className={categoryColors[task.category]}
                      variant="outline"
                    >
                      {task.category}
                    </Badge>
                    <Badge
                      className={priorityColors[task.priority]}
                      variant="outline"
                    >
                      أولوية {task.priority}
                    </Badge>
                    <Badge
                      className={statusColors[task.status]}
                      variant="outline"
                    >
                      {getStatusText(task.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTaskScheduler;
