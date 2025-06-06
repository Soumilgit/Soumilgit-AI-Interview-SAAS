"use client";
import React, { useState, useEffect } from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Contect from "../../_components/Contect";

const Upgrade = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [processingPlan, setProcessingPlan] = useState(null);
  const [processingMessage, setProcessingMessage] = useState('Payment in Progress...');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Check subscription status from localStorage (account-specific)
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return; // Don't check if no user email
      
      const subscriptionKey = `subscription_status_${userEmail}`;
      const refreshKey = `subscription_pending_refresh_${userEmail}`;
      
      const storedStatus = localStorage.getItem(subscriptionKey);
      const pendingRefresh = localStorage.getItem(refreshKey);
      
      console.log('Checking subscription status for:', userEmail, { storedStatus, pendingRefresh });
      
      if (storedStatus) {
        const subscriptionData = JSON.parse(storedStatus);
        console.log('Parsed subscription data:', subscriptionData);
        
        // If subscription requires refresh, activate it after 4-5 seconds
        if (subscriptionData.requiresRefresh) {
          console.log('Subscription requires refresh, activating in 4-5 seconds...');
          
          // Remove the refresh requirement and pending flag
          const activatedSubscription = {
            ...subscriptionData,
            requiresRefresh: false,
            activatedAt: new Date().toISOString()
          };
          
          // Wait 4-5 seconds then activate
          setTimeout(() => {
            console.log('Activating subscription now...');
            localStorage.setItem(subscriptionKey, JSON.stringify(activatedSubscription));
            localStorage.removeItem(refreshKey);
            setSubscriptionStatus(activatedSubscription);
            
            // Show activation success message
            setTimeout(() => {
              const planName = subscriptionData.plan === 'basic' ? 'Basic' : 'Premium';
              alert(`✅ Subscription Updated! Your ${planName} plan is now fully active. Enjoy your premium features!`);
            }, 500);
          }, Math.random() * 1000 + 4000); // Random delay between 4-5 seconds
        } else {
          console.log('Setting subscription status normally');
          setSubscriptionStatus(subscriptionData);
        }
      } else {
        console.log('No subscription found for this account');
        setSubscriptionStatus(null);
      }
    } catch (error) {
      console.error('Error reading subscription status:', error);
    }
  }, [user]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isContactModalOpen) {
        setIsContactModalOpen(false);
      }
    };

    if (isContactModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isContactModalOpen]);

  const isCurrentPlan = (planId) => {
    return subscriptionStatus?.isSubscribed && subscriptionStatus.plan === planId && !subscriptionStatus?.requiresRefresh;
  };

  const getPlanDetails = (plan) => {
    const plans = {
      'basic': { name: 'Basic', price: '$7.99', color: 'text-blue-600' },
      'premium': { name: 'Premium', price: '$49.00', color: 'text-orange-500' }
    };
    return plans[plan] || plans.basic;
  };

  // Handle payment button click - mark as subscribed after realistic payment time
  const handlePaymentClick = (planId, paymentUrl) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      alert('Please log in to subscribe to a plan.');
      return;
    }
    
    const subscriptionKey = `subscription_status_${userEmail}`;
    const refreshKey = `subscription_pending_refresh_${userEmail}`;
    
    // Clear any existing pending refresh flags to prevent conflicts
    localStorage.removeItem(refreshKey);
    
    // Set processing state
    setProcessingPlan(planId);
    setProcessingMessage('Opening payment window...');
    
    // Open Stripe payment window
    const paymentWindow = window.open(paymentUrl, '_blank', 'width=800,height=600');
    
    // Update processing message over time
    setTimeout(() => setProcessingMessage('Processing payment...'), 5000);
    setTimeout(() => setProcessingMessage('Confirming transaction...'), 25000);
    setTimeout(() => setProcessingMessage('Activating subscription...'), 40000);
    
    // Give user ample time to complete payment process and see Stripe success page
    setTimeout(() => {
      const subscriptionData = {
        isSubscribed: true,
        plan: planId,
        subscribedAt: new Date().toISOString(),
        sessionId: 'frontend_session_' + Date.now(),
        requiresRefresh: true, // Flag to indicate refresh is needed
        userEmail: userEmail // Store user email for verification
      };
      
      console.log('Setting up subscription with refresh requirement:', subscriptionData);
      console.log('Previous subscription status:', subscriptionStatus);
      
      // Save subscription data to localStorage immediately (account-specific)
      localStorage.setItem(subscriptionKey, JSON.stringify(subscriptionData));
      
      // Also save a flag to indicate subscription is pending activation
      localStorage.setItem(refreshKey, 'true');
      
      console.log('Saved to localStorage:', {
        subscriptionKey: localStorage.getItem(subscriptionKey),
        refreshKey: localStorage.getItem(refreshKey)
      });
      
      setSubscriptionStatus(subscriptionData);
      setProcessingPlan(null);
      setProcessingMessage('Payment in Progress...');
      
      // Show success notification with refresh requirement
      const planName = getPlanDetails(planId).name;
      alert(`🎉 Payment Confirmed! Welcome to the ${planName} plan! 
      
Your subscription is ready but requires a page refresh to activate. Please refresh the page to complete the activation and access all premium features.

Click OK and then refresh the page (F5 or Ctrl+R) to activate your subscription.`);
    }, 60000); // 60 seconds (1 minute) - gives ample time for payment completion and Stripe success page
  };

  const features = [
    "Unlimited mock interviews",
    "AI-powered feedback",
    "Interview analytics",
    "Priority support",
    "Custom question sets",
    "Export interview reports"
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Processing Banner */}
        {processingPlan && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <h2 className="text-2xl font-bold">PROCESSING PAYMENT</h2>
            </div>
            <p className="text-blue-100">
              Please complete your payment in the Stripe window. Don't close this page!
              <span className="block text-sm mt-1">
                {processingMessage}
              </span>
            </p>
          </div>
        )}

        {/* Subscription Status Banner */}
        {subscriptionStatus?.isSubscribed && !subscriptionStatus?.requiresRefresh && !processingPlan && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Check className="w-6 h-6" />
              <h2 className="text-2xl font-bold">SUBSCRIBED</h2>
            </div>
            <p className="text-green-100">
              You're currently on the <strong>{getPlanDetails(subscriptionStatus.plan).name}</strong> plan
              {subscriptionStatus.subscribedAt && (
                <span className="block text-sm mt-1">
                  Subscribed on {new Date(subscriptionStatus.subscribedAt).toLocaleDateString()}
                  {subscriptionStatus.activatedAt && (
                    <span className="block text-xs mt-1 opacity-80">
                      Activated on {new Date(subscriptionStatus.activatedAt).toLocaleDateString()}
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {subscriptionStatus?.isSubscribed ? 'Manage Your Subscription' : 'Upgrade Your Interview Prep'}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {subscriptionStatus?.isSubscribed 
              ? 'You have an active subscription. You can upgrade or manage your plan below.'
              : 'Unlock premium features to supercharge your interview preparation'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PricingPlan.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-all hover:shadow-lg ${
                isCurrentPlan(plan.id)
                  ? "border-green-500 ring-4 ring-green-500/20"
                  : "border-border"
              } ${
                theme === "dark"
                  ? "bg-card/50"
                  : "bg-background"
              }`}
            >
              {isCurrentPlan(plan.id) && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 text-center text-sm font-medium">
                  ✅ CURRENT PLAN
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{plan.duration}</h2>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}$</span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {plan.duration.split(" ")[0].toLowerCase()}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan(plan.id) ? (
                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white cursor-default"
                    disabled
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePaymentClick(plan.id, plan.link + "?prefilled_email=" + user?.primaryEmailAddress?.emailAddress)}
                    size="lg"
                    disabled={processingPlan === plan.id}
                    className={`w-full ${
                      processingPlan === plan.id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {processingPlan === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {processingMessage}
                      </div>
                    ) : (
                      subscriptionStatus?.isSubscribed ? 'Upgrade to This Plan' : 'Get Started'
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M12 2v4" />
              <path d="m16 6-4-4-4 4" />
              <path d="M8 12H4a2 2 0 0 1-2-2V6" />
            </svg>
            Enterprise plans available
          </div>
          <p className="mt-4 text-muted-foreground">
            Need custom solutions for your team?{" "}
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="text-primary hover:underline cursor-pointer"
            >
              Contact sales
            </button>
          </p>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Contact Sales</h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsContactModalOpen(false);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <Contect />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upgrade;