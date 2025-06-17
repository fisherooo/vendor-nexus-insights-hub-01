
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Star, Users, AlertTriangle, CheckCircle, X, Filter, Search, TrendingUp, DollarSign, ShoppingCart, Clock, Archive, MarkAsUnread } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

interface Notification {
  id: string;
  type: "order" | "review" | "inventory" | "team" | "system" | "payment" | "promotion" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  actionable: boolean;
  metadata?: {
    orderId?: string;
    productId?: string;
    amount?: string;
    userId?: string;
  };
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-12345 for Wireless Bluetooth Headphones (Black) has been placed by Sarah Johnson",
      timestamp: "2 minutes ago",
      read: false,
      priority: "high",
      actionable: true,
      metadata: { orderId: "ORD-12345", amount: "$89.99" }
    },
    {
      id: "2",
      type: "inventory",
      title: "Critical Stock Alert",
      message: "Smart Watch Pro (Silver) inventory is critically low (2 items remaining). Automatic reorder triggered.",
      timestamp: "15 minutes ago",
      read: false,
      priority: "urgent",
      actionable: true,
      metadata: { productId: "PROD-456" }
    },
    {
      id: "3",
      type: "review",
      title: "New 5-Star Review",
      message: "Wireless Headphones received an excellent review: 'Amazing sound quality and comfortable fit!'",
      timestamp: "1 hour ago",
      read: false,
      priority: "medium",
      actionable: false
    },
    {
      id: "4",
      type: "payment",
      title: "Payment Processed",
      message: "Weekly commission payment of $2,847.50 has been successfully processed to your account",
      timestamp: "3 hours ago",
      read: true,
      priority: "medium",
      actionable: false,
      metadata: { amount: "$2,847.50" }
    },
    {
      id: "5",
      type: "promotion",
      title: "Promotion Performance",
      message: "Your 'Summer Sale' promotion generated $1,234 in sales today with 45 orders",
      timestamp: "6 hours ago",
      read: true,
      priority: "low",
      actionable: false,
      metadata: { amount: "$1,234" }
    },
    {
      id: "6",
      type: "team",
      title: "Team Update",
      message: "Mike Johnson updated inventory for 12 products and processed 8 orders today",
      timestamp: "8 hours ago",
      read: true,
      priority: "low",
      actionable: false,
      metadata: { userId: "mike.johnson" }
    },
    {
      id: "7",
      type: "alert",
      title: "Shipping Delay Alert",
      message: "Potential shipping delays expected for orders #ORD-12340 to #ORD-12349 due to weather conditions",
      timestamp: "1 day ago",
      read: false,
      priority: "medium",
      actionable: true
    },
    {
      id: "8",
      type: "system",
      title: "Analytics Report Ready",
      message: "Your monthly performance report is ready for review. Revenue increased by 23% this month.",
      timestamp: "1 day ago",
      read: true,
      priority: "low",
      actionable: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

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

  const handleAction = (notification: Notification) => {
    switch (notification.type) {
      case "order":
        toast(`Viewing order ${notification.metadata?.orderId}`);
        break;
      case "inventory":
        toast("Redirecting to inventory management");
        break;
      case "alert":
        toast("Viewing shipping details");
        break;
      default:
        toast("Action performed");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order": return <ShoppingCart className="w-5 h-5" />;
      case "review": return <Star className="w-5 h-5" />;
      case "inventory": return <Package className="w-5 h-5" />;
      case "team": return <Users className="w-5 h-5" />;
      case "system": return <CheckCircle className="w-5 h-5" />;
      case "payment": return <DollarSign className="w-5 h-5" />;
      case "promotion": return <TrendingUp className="w-5 h-5" />;
      case "alert": return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600";
      case "high": return "text-red-500";
      case "medium": return "text-orange-600";
      case "low": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-200 text-red-900 border-red-300";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "unread" && !notification.read) ||
                      (selectedTab === "actionable" && notification.actionable);
    
    return matchesSearch && matchesType && matchesPriority && matchesTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionableCount = notifications.filter(n => n.actionable && !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === "urgent" && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">Stay updated with your store activities</p>
            {unreadCount > 0 && (
              <Badge style={{ backgroundColor: '#00B14F' }} className="text-white">
                {unreadCount} unread
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {urgentCount} urgent
              </Badge>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
            <Bell className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="alert">Alerts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="actionable">Actionable ({actionableCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                    notification.read ? "bg-gray-50/50" : "bg-white border-l-4"
                  }`}
                  style={!notification.read ? { borderLeftColor: '#00B14F' } : {}}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        notification.read ? "bg-gray-100" : "bg-green-50"
                      }`}>
                        <div className={getNotificationColor(notification.priority)}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium truncate ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                            {notification.title}
                          </h3>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </Badge>
                          {notification.actionable && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              Action Required
                            </Badge>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#00B14F' }} />
                          )}
                        </div>
                        
                        <p className={`text-sm mb-2 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                          {notification.message}
                        </p>
                        
                        {notification.metadata && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {notification.metadata.orderId && (
                              <Badge variant="secondary" className="text-xs">
                                {notification.metadata.orderId}
                              </Badge>
                            )}
                            {notification.metadata.amount && (
                              <Badge variant="secondary" className="text-xs">
                                {notification.metadata.amount}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {notification.actionable && (
                        <Button
                          size="sm"
                          onClick={() => handleAction(notification)}
                          style={{ backgroundColor: '#00B14F' }}
                          className="text-white"
                        >
                          Action
                        </Button>
                      )}
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
