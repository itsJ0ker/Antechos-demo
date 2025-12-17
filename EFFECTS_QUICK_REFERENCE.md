# Visual Effects Quick Reference Card

## 🎨 7 Effects at a Glance

### 🌟 Ambient Effects (5)

### 1️⃣ SimpleLaserFlow
```jsx
<SimpleLaserFlow color="#3B82F6" intensity={0.4} speed={0.8} />
```
**Style:** Circular flowing beams  
**Best For:** General backgrounds  
**CPU:** ⚡ Low

---

### 2️⃣ LaserBeamEffect
```jsx
<LaserBeamEffect color="#3B82F6" intensity={0.35} speed={0.6} beamCount={5} />
```
**Style:** Radial pulses with flowing particles  
**Best For:** Hero sections, CTAs  
**CPU:** ⚡⚡ Low-Medium

---

### 3️⃣ ParticleFieldEffect
```jsx
<ParticleFieldEffect color="#60A5FA" intensity={0.3} speed={0.5} particleCount={40} connectionDistance={120} />
```
**Style:** Connected particle network  
**Best For:** Teams, partnerships  
**CPU:** ⚡⚡⚡ Medium

---

### 4️⃣ WaveEffect
```jsx
<WaveEffect color="#8B5CF6" intensity={0.4} speed={0.6} waveCount={3} />
```
**Style:** Flowing wave layers  
**Best For:** Testimonials, transitions  
**CPU:** ⚡ Low

---

### 5️⃣ GridEffect
```jsx
<GridEffect color="#06B6D4" intensity={0.35} speed={0.5} gridSize={50} />
```
**Style:** Perspective grid  
**Best For:** Metrics, data viz  
**CPU:** ⚡⚡⚡ Medium

---

### 🎮 Interactive Effects (2)

#### 6️⃣ CursorTrailEffect ✨
```jsx
<CursorTrailEffect color="#60A5FA" intensity={0.7} trailLength={25} particleSize={6} />
```
**Style:** Glowing cursor trail with particles  
**Best For:** Hero sections, interactive areas  
**CPU:** ⚡⚡ Low-Medium  
**Trigger:** Mouse movement

---

#### 7️⃣ RippleEffect 💫
```jsx
<RippleEffect color="#8B5CF6" intensity={0.5} maxRipples={3} />
```
**Style:** Expanding ripple rings  
**Best For:** CTAs, click areas  
**CPU:** ⚡ Low  
**Trigger:** Mouse click / Touch

---

## 🎯 Common Props

| Prop | Type | Default | Range |
|------|------|---------|-------|
| `color` | string | '#3B82F6' | Any hex |
| `intensity` | number | 0.6 | 0.1 - 1.0 |
| `speed` | number | 1 | 0.3 - 1.5 |

## 🎨 Color Palette

| Color | Hex | Use Case |
|-------|-----|----------|
| Blue | #3B82F6 | Trust, tech |
| Indigo | #6366F1 | Innovation |
| Purple | #8B5CF6 | Premium |
| Green | #10B981 | Growth |
| Cyan | #06B6D4 | Data |
| Amber | #F59E0B | Energy |
| Pink | #EC4899 | Warmth |

## 📐 Standard Structure

```jsx
<section className="relative overflow-hidden">
  <EffectComponent color="#3B82F6" intensity={0.4} speed={0.8} />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

## ⚙️ Intensity Guide

- **0.1-0.2** → Very subtle
- **0.3-0.4** → Subtle
- **0.5-0.6** → Moderate
- **0.7-1.0** → Strong

## 🏃 Speed Guide

- **0.3-0.5** → Slow & calm
- **0.6-0.8** → Balanced
- **0.9-1.2** → Fast & energetic

## 🎬 MarketplaceRedesign Usage

| Section | Effect | Color |
|---------|--------|-------|
| Hero | LaserBeam | Blue |
| Partners | ParticleField | Lt Blue |
| Slider | Wave | Purple |
| Metrics | Grid | Cyan |
| Resources | LaserFlow | Green |
| Professionals | LaserFlow | Purple |
| Testimonials | LaserFlow | Amber |
| Services | LaserFlow | Indigo |

## 🚀 Quick Start

1. Import effect:
```jsx
import LaserBeamEffect from '../components/effects/LaserBeamEffect';
```

2. Add to section:
```jsx
<section className="relative overflow-hidden">
  <LaserBeamEffect color="#3B82F6" intensity={0.5} speed={0.8} />
  <div className="relative z-10">{/* content */}</div>
</section>
```

3. Adjust props to taste!

## 📱 All Effects Are:
✅ Responsive  
✅ Performance optimized  
✅ Auto-cleanup on unmount  
✅ No blocking interactions  
✅ Cross-browser compatible

---

**View Full Guide:** `ENHANCED_EFFECTS_GUIDE.md`  
**See Demo:** `src/components/effects/LaserFlowDemo.jsx`
