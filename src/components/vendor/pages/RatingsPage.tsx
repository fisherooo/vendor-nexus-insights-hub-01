
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User } from 'lucide-react';

export function RatingsPage() {
  const reviews = [
    {
      id: '1',
      customer: 'John Doe',
      product: 'Sample Product A',
      rating: 5,
      comment: 'Excellent product! Very satisfied with the quality.',
      date: '2024-01-15'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      product: 'Sample Product B',
      rating: 4,
      comment: 'Good product, fast delivery. Would recommend.',
      date: '2024-01-14'
    },
    {
      id: '3',
      customer: 'Mike Johnson',
      product: 'Sample Product A',
      rating: 5,
      comment: 'Perfect! Exactly what I was looking for.',
      date: '2024-01-13'
    }
  ];

  const ratingStats = {
    average: 4.8,
    total: 247,
    breakdown: {
      5: 180,
      4: 45,
      3: 15,
      2: 5,
      1: 2
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
        style={{ color: '#00B14F' }}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
      
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{ratingStats.average}</div>
              <div className="flex justify-center my-2">
                {renderStars(Math.round(ratingStats.average))}
              </div>
              <p className="text-gray-600">{ratingStats.total} total reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(ratingStats.breakdown)
              .reverse()
              .map(([rating, count]) => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium">{rating} star</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: '#00B14F',
                        width: `${(count / ratingStats.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.customer}</h3>
                    <p className="text-sm text-gray-600">{review.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
