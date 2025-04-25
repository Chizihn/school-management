import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SESSIONS } from "../../graphql/queries/queries";
import { CREATE_SESSION, UPDATE_SESSION, DELETE_SESSION } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const sessionSchema = z.object({
  year: z.string().min(4, "Year must be at least 4 characters"),
  isActive: z.boolean().default(false),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

const SessionManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const { data, loading, error, refetch } = useQuery(GET_SESSIONS);
  
  const [createSession] = useMutation(CREATE_SESSION, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Session created successfully",
      });
      refetch();
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [updateSession] = useMutation(UPDATE_SESSION, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Session updated successfully",
      });
      refetch();
      setIsUpdateDialogOpen(false);
      updateForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [deleteSession] = useMutation(DELETE_SESSION, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Session deleted successfully",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      year: "",
      isActive: false,
    },
  });

  const updateForm = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      year: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (selectedSession) {
      updateForm.setValue("year", selectedSession.year);
      updateForm.setValue("isActive", selectedSession.isActive);
    }
  }, [selectedSession, updateForm]);

  const onSubmit = (values: SessionFormValues) => {
    createSession({
      variables: {
        input: values,
      },
    });
  };

  const onUpdate = (values: SessionFormValues) => {
    if (!selectedSession) return;
    
    updateSession({
      variables: {
        id: selectedSession.id,
        input: values,
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this session?")) {
      deleteSession({
        variables: {
          id,
        },
      });
    }
  };

  const handleEdit = (session: any) => {
    setSelectedSession(session);
    setIsUpdateDialogOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Academic Sessions</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Academic Session</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2023/2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Session</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Session</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Academic Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getSessions.map((session: any) => (
              <TableRow key={session.id}>
                <TableCell>{session.year}</TableCell>
                <TableCell>{session.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{new Date(session.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(session)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(session.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Academic Session</DialogTitle>
          </DialogHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(onUpdate)} className="space-y-4">
              <FormField
                control={updateForm.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2023/2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active Session</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit">Update Session</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SessionManagement;