import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  ArrowRight, Check, Star, Users, Award, Clock, 
  Shield, Zap, TrendingUp, MessageCircle, ChevronDown,
  Play, BookOpen, Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const MarketplaceNew = () => {
  const [heroData, setHeroData] = useState(null);
  const [heroFeatures, setHeroFeatures] = useState([]);
  const [heroStats, setHeroStats] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [ctaSections, setCtaSections] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [faq, setFaq] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch hero
      const { data: hero } = await supabase
        .from('marketplace_hero')
        .select('*')
        .eq('is_active', true)
        .single();

      if (hero) {
        setHeroData(hero);
        
        // Fetch hero features
        const { data: hFeatures } =