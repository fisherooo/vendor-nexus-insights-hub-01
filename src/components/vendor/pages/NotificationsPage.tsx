
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Star, Users, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Notification {
  id: string;
  type: "order" | "review" | "inventory" | "team" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #12345 for Wireless Headphones has been placed",
      timestamp: "2 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "inventory",
      title: "Low Stock Alert",
      message: "Smart Watch inventory is running low (5 items remaining)",
      timestamp: "1 hour ago",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "review",
      title: "New Product Review",
      message: "Wireless Headphones received a 5-star review",
      timestamp: "3 hours ago",
      read: true,
      priority: "low"
    },
    {
      id: "4",
      type: "team",
      title: "Team Member Added",
      message: "Sarah Johnson has been added to your team as Manager",
      timestamp: "1 day ago",
      read: true,
      priority: "low"
    },
    {
      id: "5",
      type: "system",
      title: "Payment Processed",
      message: "Monthly commission payment of $1,234.56 has been processed",
      timestamp: "2 days ago",
      read: false,
      priority: "medium"
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast("Notification deleted");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order": return <Package className="w-5 h-5" />;
      case "review": return <Star className="w-5 h-5" />;
      case "inventory": return <AlertTriangle className="w-5 h-5" />;
      case "team": return <Users className="w-5 h-5" />;
      case "system": return <CheckCircle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600";
    if (priority === "medium") return "text-orange-600";
    return "text-blue-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your store activities
            {unreadCount > 0 && (
              <Badge className="ml-2" style={{ backgroundColor: '#00B14F' }}>
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.priority === "high").length}
                </p>
              </div>
              <Package className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => 
                    n.timestamp.includes("minute") || n.timestamp.includes("hour")
                  ).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8" style={{ color: '#00B14F' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Your latest store notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 border rounded-lg transition-all ${
                  notification.read ? "bg-gray-50" : "bg-white border-l-4"
                }`}
                style={!notification.read ? { borderLeftColor: '#00B14F' } : {}}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    notification.read ? "bg-gray-200" : "bg-green-100"
                  }`}>
                    <div className={getNotificationColor(notification.type, notification.priority)}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                        {notification.title}
                      </h3>
                      <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B14F' }} />
                      )}
                    </div>
                    <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
