"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Terminal, Copy, CheckCircle2, RotateCcw, Image as ImageIcon, Sparkles, PlaySquare, Shirt, Megaphone, Quote, PieChart, LayoutGrid, Utensils, User, Film, Eye, Layers } from "lucide-react";

export default function PromptTerminal() {
  const { t: globalT } = useLanguage();
  const t = globalT.prompt;

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [mainBenefit, setMainBenefit] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productCategory, setProductCategory] = useState("fashion");
  const [productType, setProductType] = useState("");
  const [pricePositioning, setPricePositioning] = useState("worth the price");
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState("");
  const [characterPersona, setCharacterPersona] = useState("Indonesian young woman");
  const [tryOnMode, setTryOnMode] = useState("realistic fashion try-on");
  const [hook, setHook] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [cta, setCta] = useState("");
  const [channelName, setChannelName] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  
  // Specific state for unique forms
  const [slideCount, setSlideCount] = useState("5 Slide — Standar");
  const [carouselTopic, setCarouselTopic] = useState("");
  const [gridStyle, setGridStyle] = useState("Puzzle Seamless");
  const [carouselTemplateType, setCarouselTemplateType] = useState("Product Ads");
  
  // Prompt Configuration Dropdowns
  const [visualPosition, setVisualPosition] = useState("Center / Tengah (Fokus Utama)");
  const [aestheticStyle, setAestheticStyle] = useState("Minimal Clean");
  const [aspectRatio, setAspectRatio] = useState("--ar 1:1");
  const [lightingStyle, setLightingStyle] = useState("Studio Softbox Lighting");
  const [cameraAngle, setCameraAngle] = useState("Eye-Level Shot");
  const [colorThemeLeft, setColorThemeLeft] = useState("#6366f1");
  const [colorThemeRight, setColorThemeRight] = useState("#0f172a");
  const [layoutMultiImage, setLayoutMultiImage] = useState("3 Gambar (Showcase Composition)");
  const [typographyDNA, setTypographyDNA] = useState("Startup SaaS");
  const [typographyEnergy, setTypographyEnergy] = useState("Clean");
  const [characterStyle, setCharacterStyle] = useState("Auto Character");
  const [characterPose, setCharacterPose] = useState("Auto (AI pilih)");
  const [visualIntensity, setVisualIntensity] = useState("Balanced");
  const [backgroundSystem, setBackgroundSystem] = useState("Solid Premium");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "design-feeds";

  // Specific state for templates
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Define grid templates based on modes
  const gridTemplates: Record<string, { title: string; desc: string; icon: any; preset: any }[]> = {
    fnb: [
      { title: "Patisserie Luxury", desc: "4 KAT • 10 ITEM", icon: ImageIcon, preset: { productName: "Croissant & Truffle", aestheticStyle: "Luxury Premium", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Top-Down Flatlay Shot", aspectRatio: "--ar 3:4" } },
      { title: "Healthy Food Editorial", desc: "3 KAT • 8 ITEM", icon: ImageIcon, preset: { productName: "Avocado Toast", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Korean Street Food", desc: "3 KAT • 7 ITEM", icon: ImageIcon, preset: { productName: "Spicy Tteokbokki", aestheticStyle: "Warm & Cozy", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "High Angle Shot", aspectRatio: "--ar 1:1" } },
      { title: "Indonesian Heritage", desc: "3 KAT • 8 ITEM", icon: ImageIcon, preset: { productName: "Nasi Goreng Spesial", aestheticStyle: "Warm & Cozy", lightingStyle: "Moody moody dark lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } }
    ],
    youtube: [
      { title: "Tech Review Vlog", desc: "NEON • GLOWING", icon: PlaySquare, preset: { productName: "iPhone 16 Pro", aestheticStyle: "Futuristic Tech", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Gaming Let's Play", desc: "SHOCKED • DRAMATIC", icon: PlaySquare, preset: { productName: "GTA VI Gameplay", aestheticStyle: "Dark Neon", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Dutch Angle", aspectRatio: "--ar 16:9" } },
      { title: "Finance/Crypto", desc: "GREEN STONKS • BOLD", icon: PlaySquare, preset: { productName: "Bitcoin Tembus $100k", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Clickbait Drama", desc: "RED ARROW • HIGH CONTRAST", icon: PlaySquare, preset: { productName: "Klarifikasi", aestheticStyle: "Minimal Clean", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 16:9" } }
    ],
    fashion: [
      { title: "Streetwear Hype", desc: "GRUNGE • Y2K", icon: Shirt, preset: { productName: "Oversized Hoodie", aestheticStyle: "Streetwear / Hypebeast", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 4:5" } },
      { title: "High-End Luxury", desc: "VOGUE • ELEGANT", icon: Shirt, preset: { productName: "Silk Evening Gown", aestheticStyle: "Luxury Premium", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 3:4" } },
      { title: "Summer Casual", desc: "BRIGHT • SUNLIGHT", icon: Shirt, preset: { productName: "Linen Beach Shirt", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Avant-Garde", desc: "WEIRD • HIGH FASHION", icon: Shirt, preset: { productName: "Experimental Couture", aestheticStyle: "Dark Neon", lightingStyle: "Moody moody dark lighting", cameraAngle: "Dutch Angle", aspectRatio: "--ar 4:5" } }
    ],
    promo: [
      { title: "Flash Sale 11.11", desc: "RED • BIG TYPO", icon: Megaphone, preset: { productName: "Diskon 90%", aestheticStyle: "Bright & Fresh", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 1:1" } },
      { title: "Product Launch", desc: "MYSTERIOUS • DARK", icon: Megaphone, preset: { productName: "New Smartwatch", aestheticStyle: "Futuristic Tech", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 16:9" } },
      { title: "Webinar Event", desc: "CORPORATE • CLEAN", icon: Megaphone, preset: { productName: "Masterclass Bisnis", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Holiday Special", desc: "FESTIVE • GOLD", icon: Megaphone, preset: { productName: "Ramadhan Promo", aestheticStyle: "Luxury Premium", lightingStyle: "Warm & Cozy", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 1:1" } }
    ],
    quotes: [
      { title: "Minimalist Text", desc: "WHITE • ELEGANT", icon: Quote, preset: { productName: "Inspirational Quote", aestheticStyle: "Minimal Clean", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Dark Moody", desc: "SHADOWS • DEEP", icon: Quote, preset: { productName: "Deep Thoughts", aestheticStyle: "Ethereal / Dreamy", lightingStyle: "Moody moody dark lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Nature Serenity", desc: "FOREST • SUN RAYS", icon: Quote, preset: { productName: "Morning Motivation", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Abstract 3D", desc: "GLASS • NEON", icon: Quote, preset: { productName: "Modern Wisdom", aestheticStyle: "Futuristic Tech", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } }
    ],
    infografis: [
      { title: "Isometric Data", desc: "3D • FLOATING", icon: PieChart, preset: { productName: "Q3 Revenue Stats", aestheticStyle: "Futuristic Tech", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Dutch Angle", aspectRatio: "--ar 16:9" } },
      { title: "Cyberpunk Dashboard", desc: "HUD • NEON", icon: PieChart, preset: { productName: "Crypto Tracker", aestheticStyle: "Dark Neon", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Flat Clean Design", desc: "VECTOR • 2D", icon: PieChart, preset: { productName: "User Demographics", aestheticStyle: "Minimal Clean", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Top-Down Flatlay Shot", aspectRatio: "--ar 16:9" } },
      { title: "Corporate Chart", desc: "BLUE • PRO", icon: PieChart, preset: { productName: "Annual Report", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } }
    ]
  };

  const handleTemplateSelect = (tpl: any) => {
    setSelectedTemplate(tpl.title);
    if (tpl.preset) {
      if (tpl.preset.productName) setProductName(tpl.preset.productName);
      if (tpl.preset.aestheticStyle) setAestheticStyle(tpl.preset.aestheticStyle);
      if (tpl.preset.lightingStyle) setLightingStyle(tpl.preset.lightingStyle);
      if (tpl.preset.cameraAngle) setCameraAngle(tpl.preset.cameraAngle);
      if (tpl.preset.aspectRatio) setAspectRatio(tpl.preset.aspectRatio);
    }
  };

  // Reset selected template when mode changes
  useEffect(() => {
    if (gridTemplates[mode] && gridTemplates[mode].length > 0) {
      setTimeout(() => setSelectedTemplate(gridTemplates[mode][0].title), 0);
    } else {
      setTimeout(() => setSelectedTemplate(""), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Dummy terminal logs state
  const [logs, setLogs] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Dynamic build command based on mode
    const commandMode = mode === "fnb" ? "menufb" : mode === "youtube" ? "thumbnail" : mode === "fashion" ? "lookbook" : "storyboard";
    setLogs([`$ feeds build --mode=${commandMode}`]);

    // Simulate terminal typing effect
    setTimeout(() => setLogs(prev => [...prev, "▸ form input : connected"]), 400);
    setTimeout(() => setLogs(prev => [...prev, "▸ template : ready"]), 800);
    setTimeout(() => setLogs(prev => [...prev, "▸ output : generating prompt..."]), 1200);

    setTimeout(() => {
      // Menghasilkan Seed acak yang akan mengunci konsistensi gambar
      const seed = Math.floor(Math.random() * 899999999) + 100000000;
      const srefCode = Math.random().toString(36).substring(2, 8).toLowerCase();
      
      let promptCode = "";
      const tpl = selectedTemplate || "Default Concept";
      
      // Parse Aspect Ratio
      const arValue = aspectRatio.split(" ")[0] || "1:1";
      
      // Build visual styling parameters optimized for Midjourney
      const visualStyles = `:: typography style: ${typographyDNA}, ${typographyEnergy} :: character model: ${characterStyle}, pose: ${characterPose} :: visual intensity: ${visualIntensity} :: background environment: ${backgroundSystem} :: brand colors: ${colorThemeLeft}, ${colorThemeRight} :: composition layout: ${layoutMultiImage}, ${visualPosition}`;
      
      const midjourneyParams = `--ar ${arValue} --style raw --stylize 200 --seed ${seed} --sref ${srefCode} --v 6.0`;

      const baseModelParameters = {
        aspect_ratio: aspectRatio.replace("--ar ", ""),
        style_preset: aestheticStyle,
        camera_angle: cameraAngle,
        visual_intensity: visualIntensity,
        background_environment: backgroundSystem,
        quality: "high",
        photorealism: "ultra-realistic, 8k resolution"
      };

      const globalCompositionRules = [
        "Rule of thirds for balanced layout",
        "Clear visual hierarchy focusing on the main subject",
        "Ensure background does not overpower the foreground"
      ];
      
      const globalNegativePrompt = "ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, bad typography, warped products, misspelled words, cluttered background, watermarks, signatures, text artifacts, low resolution";

      switch (mode) {
        case "storyboard":
          promptCode = JSON.stringify({
            task_type: "storyboard_generation",
            system_directive: "You are an elite Commercial Storyboard Artist. Create a premium storyboard scene based on the exact specifications below.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A cinematic commercial storyboard scene for ${productName || "premium product"}`,
              narrative_elements: {
                product_category: productCategory,
                scene_action: productDesc || "-",
                emphasizing_benefit: mainBenefit || "-",
                problem_solved: problemSolved || "-",
                target_audience: targetAudience || "-"
              },
              visual_style_details: {
                character: `${characterStyle}, pose: ${characterPose}`,
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Cinematic, ${typographyDNA}, ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "logo":
          promptCode = JSON.stringify({
            task_type: "logo_design_generation",
            system_directive: "You are a Master Brand Identity Designer. Create a premium logo design based on the exact specifications below.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional brand logo design for ${productName || "Startup"}`,
              brand_identity: {
                brand_name: productName || "-",
                industry_category: productCategory,
                niche_type: productType || "-",
                target_market: targetAudience || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                aesthetic_keywords: `Professional logo, vector style, minimalistic, flat design, no text artifacts. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: ["Centered layout", "Clear negative space", "Iconic and memorable", ...globalCompositionRules],
              negative_prompt: "text, watermark, " + globalNegativePrompt
            }
          }, null, 2);
          break;
        case "9-feed":
          promptCode = JSON.stringify({
            task_type: "instagram_grid_generation",
            system_directive: "You are an elite Social Media Designer. Create a continuous 9-square seamless puzzle feed layout based on the exact specifications.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A continuous seamless puzzle feed layout for ${channelName || "Brand"}`,
              content_strategy: {
                brand_account: channelName || "-",
                product_focus: productType || "-",
                visual_vibe: productDesc || "-",
                benefit_highlight: mainBenefit || "-",
                target_audience: targetAudience || "-"
              },
              grid_layout: {
                puzzle_style: gridStyle,
                composition: "9-square grid continuous seamless flow"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Instagram aesthetic puzzle feed, continuous background, cohesive brand identity. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "ads":
          promptCode = JSON.stringify({
            task_type: "typography_ads_generation",
            system_directive: "You are an elite Advertising Art Director. Create a bold, high-converting advertising layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: "A high-impact typography advertising layout",
              copywriting_elements: {
                main_headline_hook: hook || "-",
                subheadline: subheadline || "-",
                call_to_action: cta || "-"
              },
              product_visual_layout: {
                composition_style: layoutMultiImage,
                placement_rule: visualPosition
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Bold advertising layout, high contrast, commercial photography. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "youtube":
          promptCode = JSON.stringify({
            task_type: "youtube_thumbnail_generation",
            system_directive: "You are a Viral YouTube Thumbnail Designer. Create an eye-catching, high-CTR thumbnail.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A viral YouTube thumbnail for video titled "${productName || "Viral Video"}"`,
              thumbnail_elements: {
                video_title: productName || "-",
                hook_text: hook || "-",
                channel_style: channelName || "-",
                key_visual_points: keyPoints || "-"
              },
              visual_layout: {
                character: `${characterStyle}, pose: ${characterPose}`,
                placement_rule: visualPosition
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `YouTube thumbnail, high contrast, glowing effects, expressive character. Typography Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "review":
          promptCode = JSON.stringify({
            task_type: "affiliate_review_generation",
            system_directive: "You are an elite Product Reviewer & Affiliate Marketer. Create a compelling product review layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional product review layout for ${productName || "Product"}`,
              product_details: {
                product_name: productName || "-",
                category: productCategory,
                type: productType || "-",
                price_positioning: pricePositioning,
                description: productDesc || "-"
              },
              value_proposition: {
                core_benefit: mainBenefit || "-",
                unique_selling_point: uniqueSellingPoint || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Product showcase, review layout, clean typography, editorial style. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "design-feeds":
          const jsonOutput = {
            task_type: "commercial_banner_generation",
            system_directive: "You are an elite Commercial Art Director and Graphic Designer. Create a premium product promotional banner based on the exact specifications below. Ensure the provided product image(s) are seamlessly integrated.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional promotional banner for ${channelName || "Product"}`,
              branding_elements: {
                brand_name: channelName || "-",
                headline: productName || "-",
                subheadline: subheadline || "-",
                description: productDesc || "-",
                call_to_action: cta || "-"
              },
              product_visual_layout: {
                expected_images_count: parseInt(layoutMultiImage) || 1,
                composition_style: layoutMultiImage,
                placement_rule: `Place the main product composition clearly on the ${visualPosition.includes("Kanan") ? "RIGHT" : visualPosition.includes("Kiri") ? "LEFT" : "CENTER"} side. Maintain visual balance between text and product.`,
                integration_and_blending: `Blend the product(s) seamlessly into the environment with accurate shadows and reflections matching the lighting style: ${lightingStyle}.`,
                strict_multi_image_rules: [
                  "Use ALL uploaded product images in the final composition.",
                  "Create a cohesive multi-product arrangement.",
                  "Every uploaded image must appear clearly in the design.",
                  "Do NOT merge them into one product.",
                  "POSITION LOCK: The composition MUST strictly follow the requested visual positioning."
                ]
              },
              information_layout: {
                features_to_highlight: features.length > 0 ? features : ["Premium Quality"],
                ui_elements: `Incorporate minimalist floating UI cards, feature icons, or glassmorphism panels to display the features around the product.\nIMPORTANT: Add a premium modern CTA (Call-to-Action) button displaying: '${cta || "Beli Sekarang"}'. Make it prominent to encourage user interaction.`
              },
              visual_style_details: {
                color_palette: {
                  primary_accent: colorThemeLeft,
                  secondary_background: colorThemeRight,
                  harmony: "Create a cohesive color grading using these specific hex colors as the dominant palette."
                },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Ample negative space, very clean background, Apple-like product presentation, modern sans-serif typography feel, uncluttered. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              typography_instructions: "Leave clear negative space for typography. The generated image should either include sleek modern typography for the headline/features, or provide clean areas where text can be overlaid perfectly later.",
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          };
          promptCode = JSON.stringify(jsonOutput, null, 2);
          break;
        case "fnb":
          promptCode = JSON.stringify({
            task_type: "fnb_menu_generation",
            system_directive: "You are a Master Food Photographer and Menu Designer. Create an appetizing food photography layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `An appetizing food photography menu for ${productName || "Restaurant"}`,
              restaurant_info: {
                restaurant_name: productName || "-",
                cuisine_category: productCategory,
                contact_info: channelName || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Appetizing food photography, editorial menu layout, depth of field, mouth-watering. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "tryon":
          promptCode = JSON.stringify({
            task_type: "fashion_tryon_generation",
            system_directive: "You are a Fashion Photography Director. Create a hyper-realistic fashion try-on showcase.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A hyper-realistic fashion photography try-on for ${productName || "Clothing"}`,
              garment_details: {
                product_name: productName || "-",
                category: productCategory,
                garment_type: productType || "-",
                try_on_mode: tryOnMode
              },
              model_casting: {
                target_audience_vibe: targetAudience || "-",
                model_persona: characterPersona,
                character_style: characterStyle
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Fashion editorial, lookbook, ultra-realistic clothing textures. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "carousel":
          promptCode = JSON.stringify({
            task_type: "carousel_feed_generation",
            system_directive: "You are an elite Educational Content Designer. Create a seamless continuous multi-slide carousel layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A ${slideCount} seamless continuous carousel about ${carouselTopic || "Topic"}`,
              content_strategy: {
                template_type: carouselTemplateType,
                topic: carouselTopic || "-",
                target_audience: targetAudience || "-",
                highlighting_benefit: uniqueSellingPoint || "-",
                problem_solved: hook || "-"
              },
              layout_details: {
                total_slides: slideCount,
                composition: "Seamless continuous horizontal flow across slides"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Educational carousel, instagram infographic, modern UI elements. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        default:
          promptCode = JSON.stringify({
            task_type: "premium_design_generation",
            system_directive: "You are an elite Graphic Designer. Create a premium layout design.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A premium layout design for ${productName || "Product"}`,
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Premium design, clean layout. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
      }
      
      // --- MAXIMIZE ENGINE ARCHITECTURE ---
      // Inject Midjourney specifics and LLM constraints dynamically into the generated JSON
      try {
        let finalJson = JSON.parse(promptCode);
        finalJson.midjourney_parameters = midjourneyParams;
        finalJson.midjourney_raw_prompt_template = `/imagine prompt: [Insert Subject Details Here] ${visualStyles} ${midjourneyParams}`;
        
        if (finalJson.system_directive) {
           finalJson.system_directive += " Your final output MUST include a single, highly optimized Midjourney v6 prompt string. Append the 'midjourney_parameters' to the very end of your prompt. Use the 'midjourney_raw_prompt_template' as your baseline.";
        }
        
        promptCode = JSON.stringify(finalJson, null, 2);
      } catch(e) {
        console.error("Failed to inject engine architecture", e);
      }
      // ------------------------------------

      setGeneratedPrompt(promptCode);
      setIsGenerating(false);
      setLogs(prev => [...prev, "▸ status : done"]);
    }, 2000);
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setGeneratedPrompt("");
    setLogs([]);
  };

  let headerTitle = "Storyboard Affiliate";
  let headerDesc = "Buat konsep storyboard video: scene-by-scene + caption + shot list otomatis. Pakai foto produk + ikuti video tutorial.";

  if (mode === "fnb") {
    headerTitle = "Menu F&B";
    headerDesc = "Buat menu poster F&B dinamis — patisserie, restaurant, healthy food, dessert.";
  } else if (mode === "youtube") {
    headerTitle = "YouTube Thumbnail";
    headerDesc = "Generate prompt clickbait YouTube thumbnail dengan layout dinamis.";
  } else if (mode === "carousel") {
    headerTitle = "Instagram Carousel";
    headerDesc = "Buat struktur prompt untuk slide Instagram Carousel edukasi yang menyambung.";
  } else if (mode === "fashion") {
    headerTitle = "Katalog Fashion";
    headerDesc = "Generator lookbook fashion kelas atas. Setup studio, model pose, aesthetic.";
  } else if (mode === "promo") {
    headerTitle = "Promo Banner";
    headerDesc = "Buat banner diskon, flash sale, dan event dengan layout tipografi.";
  } else if (mode === "quotes") {
    headerTitle = "Quotes Template";
    headerDesc = "Generator background minimalis untuk template quotes harian.";
  } else if (mode === "infografis") {
    headerTitle = "Infografis";
    headerDesc = "Visualisasi data, grafik 3D, dan dashboard UI elemen.";
  } else if (mode === "9-feed") {
    headerTitle = "9 Feed Konsisten";
    headerDesc = "Buat 9 grid puzzle Instagram yang nyambung dan konsisten warnanya.";
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full">

      {/* Left Panel: Dynamic Content Based on Mode */}
      <div className="w-full lg:w-[450px] bg-[#0a0a0a] border-r border-[#1f1f1f] p-0 overflow-y-auto custom-scrollbar shrink-0 flex flex-col">

        {/* Dynamic Header */}
        <div className="p-6 border-b border-[#1f1f1f]">
          <h2 className="text-xl font-bold text-white mb-1">{headerTitle}</h2>
          <p className="text-sm text-gray-400">{headerDesc}</p>
        </div>

        <div className="p-6 pb-2">
          {gridTemplates[mode] && (
            // RENDER GRID TEMPLATE FOR SUPPORTED MODES
            <>
              <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white font-bold">0.</div>
                  <span className="text-white font-semibold">Pilih Template Demo</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wider">
                  <span className="bg-white text-white px-2 py-0.5 rounded-sm">{t.startHere}</span>
                  4 TEMPLATE <span className="text-white">{t.allTemplates}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/20 rounded-md p-3 mb-6">
                <p className="text-xs text-gray-300 leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" /> Pilih template dari {headerTitle} di bawah untuk mengisi otomatis pengaturan prompt.
                </p>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 gap-4 pb-6">
                {gridTemplates[mode].map((tpl, i) => {
                  const isSelected = selectedTemplate === tpl.title;
                  const Icon = tpl.icon;
                  return (
                    <div
                      key={i}
                      className="group cursor-pointer"
                      onClick={() => handleTemplateSelect(tpl)}
                    >
                      <div className={`aspect-[3/4] bg-[#1a1a1a] border rounded-lg mb-2 overflow-hidden transition-colors flex items-center justify-center text-gray-600 ${isSelected ? 'border-white bg-white/5' : 'border-[#2a2a2a] group-hover:border-gray-500'}`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white opacity-100' : 'opacity-50'}`} />
                      </div>
                      <h4 className={`font-semibold text-sm ${isSelected ? 'text-gray-300' : 'text-white'}`}>{tpl.title}</h4>
                      <p className="text-[10px] font-mono text-gray-500">{tpl.desc}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* RENDER FORMS */}
          <div className="space-y-4">
            
            {mode === 'storyboard' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white">
                    <Film className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{t.sectionProduct}</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                    <span className="text-white text-xs">💡</span>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Output = <span className="text-gray-300">konsep storyboard</span>. Produk dijaga sama persis — scene-by-scene otomatis. Ikuti video tutorial untuk memakainya.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productName}</label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Mini Leather Tote" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="fashion">fashion</option>
                        <option value="skincare">skincare</option>
                        <option value="fnb">fnb</option>
                        <option value="tech">tech</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Description (opsional)</label>
                    <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Mini tote bag premium untuk daily use." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit (opsional)</label>
                      <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="bikin outfit terlihat lebih premium" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Problem Solved (opsional)</label>
                      <input type="text" value={problemSolved} onChange={e => setProblemSolved(e.target.value)} placeholder="tas murah cepat rusak" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Audience <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                    <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="wanita karir 25-35 tahun" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                </div>
              </div>
            )}

            {mode === 'logo' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">0. Mau bikin apa?</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex rounded-md overflow-hidden border border-[#2a2a2a]">
                      <button className="flex-1 bg-white text-white font-bold py-2.5 text-sm flex items-center justify-center gap-2"><ImageIcon className="w-4 h-4"/> Buat Logo</button>
                      <button className="flex-1 bg-[#111] text-gray-400 hover:text-white font-medium py-2.5 text-sm flex items-center justify-center gap-2"><Shirt className="w-4 h-4 text-white"/> Brand Mockup</button>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-3">Logo: generate logo baru dari nol.</p>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">1. Brand Identity</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Brand Name <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="GlowUp Beauty" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Brand Category <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="skincare">skincare</option>
                          <option value="fashion">fashion</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                        <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="serum brightening, vitamin C" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Market <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="Gen Z female">Gen Z female</option>
                          <option value="Millennials">Millennials</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {mode === '9-feed' && (
              <>
                <div className="bg-white/5 border border-white/20 rounded-lg p-3.5 mb-6 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-white"><PlaySquare className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-gray-300 font-bold text-sm">Tutorial: 9 Feed Konsisten</h4>
                      <p className="text-[10px] text-gray-400">Cara pakai lengkap — Generate → ChatGPT/AI Image lainnya → Lalu paste</p>
                    </div>
                  </div>
                  <div className="text-white">▼</div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">A. Brand & Produk</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Brand <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="POPO" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Username Instagram</label>
                        <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="@popoofficial" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Produk <span className="text-white">*</span></label>
                      <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="Piano Anak Elektronik + Microphone" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Deskripsi Singkat Produk</label>
                      <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Piano elektronik anak 61/37 keys..." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Manfaat Utama</label>
                        <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Audience</label>
                        <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {mode === 'ads' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">A. Typography Core</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Typography Hook <span className="text-white">*</span> <span className="text-gray-500 font-normal">0 kata · 0 karakter</span></label>
                      <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="VISUAL YANG MENJUAL" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Subheadline (Opsional)</label>
                        <input type="text" value={subheadline} onChange={e => setSubheadline(e.target.value)} placeholder="Formulasi Dermatologis Teruji" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">CTA / Small Text (Opsional)</label>
                        <input type="text" value={cta} onChange={e => setCta(e.target.value)} placeholder="Beli di Shopee" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">{t.sectionLayout}</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Jumlah Gambar / Produk</label>
                      <select value={layoutMultiImage} onChange={e => setLayoutMultiImage(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="1 Gambar Utama (Hero Focus)">1 Gambar Utama (Hero Focus)</option>
                        <option value="2 Gambar (Comparison/Dual)">2 Gambar (Comparison/Dual)</option>
                        <option value="3 Gambar (Showcase Composition)">3 Gambar (Showcase Composition)</option>
                        <option value="4 Gambar (Grid Layout)">4 Gambar (Grid Layout)</option>
                        <option value="5 Gambar (Collage Style)">5 Gambar (Collage Style)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Posisi Subject / Hero</label>
                      <select value={visualPosition} onChange={e => setVisualPosition(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="Center / Tengah (Fokus Utama)">Center / Tengah (Fokus Utama)</option>
                        <option value="Di Kanan (Teks di Kiri)">Di Kanan (Teks di Kiri)</option>
                        <option value="Di Kiri (Teks di Kanan)">Di Kiri (Teks di Kanan)</option>
                        <option value="Isometric / Melayang">Isometric / Melayang</option>
                        <option value="Dynamic Multiple Layout">Dynamic Multiple Layout</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {mode === 'youtube' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><PlaySquare className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">A. Video Core</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Judul Video <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Sunscreen Ringan Tanpa Whitecast" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Hook Tambahan (Opsional)</label>
                        <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="Formulasi Dermatologis Teruji" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Channel / Brand (Opsional)</label>
                        <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="AuraSkin" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Key Points (Opsional)</label>
                      <input type="text" value={keyPoints} onChange={e => setKeyPoints(e.target.value)} placeholder="Tanpa Paraben · Cruelty Free · Dermatologist Tested" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">{t.sectionLayout}</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Jumlah Gambar / Produk</label>
                      <select value={layoutMultiImage} onChange={e => setLayoutMultiImage(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="1 Gambar Utama (Hero Focus)">1 Gambar Utama (Hero Focus)</option>
                        <option value="2 Gambar (Comparison/Dual)">2 Gambar (Comparison/Dual)</option>
                        <option value="3 Gambar (Showcase Composition)">3 Gambar (Showcase Composition)</option>
                        <option value="4 Gambar (Grid Layout)">4 Gambar (Grid Layout)</option>
                        <option value="5 Gambar (Collage Style)">5 Gambar (Collage Style)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Posisi Subject / Hero</label>
                      <select value={visualPosition} onChange={e => setVisualPosition(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="Center / Tengah (Fokus Utama)">Center / Tengah (Fokus Utama)</option>
                        <option value="Di Kanan (Teks di Kiri)">Di Kanan (Teks di Kiri)</option>
                        <option value="Di Kiri (Teks di Kanan)">Di Kiri (Teks di Kanan)</option>
                        <option value="Isometric / Melayang">Isometric / Melayang</option>
                        <option value="Dynamic Multiple Layout">Dynamic Multiple Layout</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {mode === 'review' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">{t.sectionProduct}</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                    <span className="text-white text-xs">💡</span>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Output = <span className="text-gray-300">konsep banner review</span>. Produk dijaga sama persis — ikuti video tutorial untuk hasilkan visualnya.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Name <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Mini Leather Tote" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="skincare">skincare</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                      <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="premium genuine leather mini tote bag" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Price Positioning <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={pricePositioning} onChange={e => setPricePositioning(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="worth the price">worth the price</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Description (opsional)</label>
                    <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Tas mini kulit asli untuk daily premium look..." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit</label>
                      <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="tampil premium tanpa harga branded" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Unique Selling Point (opsional)</label>
                      <input type="text" value={uniqueSellingPoint} onChange={e => setUniqueSellingPoint(e.target.value)} placeholder="kulit asli, jahitan rapi" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {mode === 'design-feeds' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">A. Informasi Brand & Produk</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Brand <span className="text-white">*</span></label>
                      <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="AuraSkin" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Judul Utama <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Sunscreen Ringan Tanpa Whitecast" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Sub Judul / Tagline</label>
                    <input type="text" value={subheadline} onChange={e => setSubheadline(e.target.value)} placeholder="Formulasi Dermatologis Teruji" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Deskripsi Singkat (Opsional)</label>
                    <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Produk perawatan kulit yang diformulasikan..." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">CTA / Call-to-Action (Opsional)</label>
                    <input type="text" value={cta} onChange={e => setCta(e.target.value)} placeholder="Beli di Shopee" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                </div>
              </div>

              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">B. Fitur Unggulan Produk</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-teal-500/10 text-teal-400 px-3 py-1.5 rounded-full text-xs border border-teal-500/20">
                        {feat}
                        <button onClick={() => setFeatures(f => f.filter((_, idx) => idx !== i))} className="hover:text-white transition-colors">×</button>
                      </div>
                    ))}
                    <input 
                      type="text" 
                      value={featureInput} 
                      onChange={e => setFeatureInput(e.target.value)} 
                      onKeyDown={e => {
                        if (e.key === 'Enter' && featureInput.trim()) {
                          e.preventDefault();
                          setFeatures([...features, featureInput.trim()]);
                          setFeatureInput('');
                        }
                      }}
                      placeholder="+ tambah" 
                      className="bg-transparent border-none text-xs text-white focus:outline-none w-24 px-2"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500">Pisahkan fitur dengan ENTER.</p>
                </div>
              </div>

              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">{t.sectionLayout}</h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Jumlah Gambar</label>
                    <select value={layoutMultiImage} onChange={e => setLayoutMultiImage(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                      <option value="3 Gambar (Showcase Composition)">3 Gambar (Showcase Composition)</option>
                      <option value="1 Gambar Utama">1 Gambar Utama</option>
                      <option value="2 Gambar (Split Frame)">2 Gambar (Split Frame)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Posisi Visual</label>
                    <select value={visualPosition} onChange={e => setVisualPosition(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                      <option value="Di Kanan (Teks di Kiri)">Di Kanan (Teks di Kiri)</option>
                      <option value="Di Kiri (Teks di Kanan)">Di Kiri (Teks di Kanan)</option>
                      <option value="Di Tengah (Center Focus)">Di Tengah (Center Focus)</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
            )}
            {mode === 'fnb' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Utensils className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">1. Informasi Brand & Bisnis</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Resto / Cafe <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Cherryelle Patisserie" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Kategori F&B <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="dessert/bakery">Dessert & Bakery</option>
                        <option value="cafe">Cafe & Coffee Shop</option>
                        <option value="restaurant">Restaurant</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Alamat & Kontak (Opsional)</label>
                    <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="Jl. Sudirman No. 12 | @cherryelle" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                </div>
              </div>
            )}
            
            {mode === 'tryon' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Shirt className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">1. Product Info</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Name <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Crop Tee Linen Premium" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="fashion">fashion</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                        <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="oversized fit, soft cotton" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Audience <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="wanita 18-30">wanita 18-30</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                      <span className="text-white text-xs">💡</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Siapkan foto produkmu sebagai gambar referensi — ikuti langkah di video tutorial.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><User className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">2. Character & Persona</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Character Persona <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={characterPersona} onChange={e => setCharacterPersona(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="Indonesian young woman">Indonesian young woman</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Try-On Mode <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={tryOnMode} onChange={e => setTryOnMode(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="realistic fashion try-on">realistic fashion try-on</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            {mode === "carousel" && (
              <>
                <p className="text-gray-400 text-xs mb-4">
                  Pilih tipe template carousel & jumlah slide — sistem menyusun story flow, objektif tiap slide, dan variasi layout jadi satu rangkaian konten.
                </p>

                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-teal-500/10 p-3.5 flex items-center gap-3 border-b border-teal-500/20">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-md flex items-center justify-center text-teal-400"><Layers className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-teal-400">A. Tipe Carousel & Jumlah Slide</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Carousel Template Type</label>
                      <div className="relative">
                        <select 
                          value={carouselTemplateType}
                          onChange={(e) => setCarouselTemplateType(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                        >
                          <option value="Product Ads">Product Ads</option>
                          <option value="Service Ads">Service Ads</option>
                          <option value="Motivation">Motivation</option>
                          <option value="Educational">Educational</option>
                          <option value="Personal Branding">Personal Branding</option>
                          <option value="Promo / Discount">Promo / Discount</option>
                          <option value="Testimonial / Review">Testimonial / Review</option>
                          <option value="Problem Solution">Problem Solution</option>
                          <option value="Myth vs Fact">Myth vs Fact</option>
                          <option value="Tips / How To">Tips / How To</option>
                          <option value="Before After">Before After</option>
                          <option value="Storytelling / Journey">Storytelling / Journey</option>
                          <option value="News (Berita) — cukup isi berita">News (Berita) — cukup isi berita</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Total Slides</label>
                      <div className="relative mb-1">
                        <select 
                          value={slideCount}
                          onChange={(e) => setSlideCount(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                        >
                          <option value="3 Slide — Ringkas (Hook → Value → CTA)">3 Slide — Ringkas (Hook → Value → CTA)</option>
                          <option value="4 Slide — Singkat">4 Slide — Singkat</option>
                          <option value="5 Slide — Standar">5 Slide — Standar</option>
                          <option value="6 Slide — Lengkap">6 Slide — Lengkap</option>
                          <option value="7 Slide — Storytelling Lengkap">7 Slide — Storytelling Lengkap</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                      <p className="text-[10px] text-gray-500">Pilih 3-7 slide (maksimal 7).</p>
                    </div>
                  </div>
                </div>

                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-md flex items-center justify-center text-teal-400"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">B. Detail Konten</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Produk / Konten <span className="text-teal-500">*</span></label>
                        <input type="text" value={carouselTopic} onChange={e => setCarouselTopic(e.target.value)} placeholder="Glow Serum" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Audience</label>
                        <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="Wanita 20-35, kulit kusam" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit</label>
                        <input type="text" value={uniqueSellingPoint} onChange={e => setUniqueSellingPoint(e.target.value)} placeholder="Mencerahkan dalam 14 hari" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Problem Solved</label>
                        <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="Kulit kusam dan noda hitam" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* D. Style & Visual */}
            <div className="pt-4 border-t border-[#1f1f1f] space-y-5 pb-6">
              <div className="bg-teal-500/10 p-3 rounded-lg border border-teal-500/20 mb-4">
                <h3 className="text-sm font-bold text-teal-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" /> D. Style & Visual
                </h3>
              </div>
              
              {/* Row 1: Typography DNA & Typography Energy */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                    Typography DNA <span className="bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded">DNA</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={typographyDNA}
                      onChange={(e) => setTypographyDNA(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Startup SaaS">Startup SaaS</option>
                      <option value="Apple Minimal">Apple Minimal</option>
                      <option value="Neo Brutalist">Neo Brutalist</option>
                      <option value="Swiss Editorial">Swiss Editorial</option>
                      <option value="Luxury Fashion">Luxury Fashion</option>
                      <option value="Cyberpunk Neon">Cyberpunk Neon</option>
                      <option value="Retro Futuristic">Retro Futuristic</option>
                      <option value="Japanese Minimal">Japanese Minimal</option>
                      <option value="Hyper Commercial">Hyper Commercial</option>
                      <option value="Street Poster">Street Poster</option>
                      <option value="Y2K Energy">Y2K Energy</option>
                      <option value="Viral TikTok Ads">Viral TikTok Ads</option>
                      <option value="Luxury Black Gold">Luxury Black Gold</option>
                      <option value="Modern Tech">Modern Tech</option>
                      <option value="Glassmorphism Premium">Glassmorphism Premium</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                    Typography Energy <span className="bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded">ENERGY</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={typographyEnergy}
                      onChange={(e) => setTypographyEnergy(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Clean">Clean</option>
                      <option value="Calm">Calm</option>
                      <option value="Premium">Premium</option>
                      <option value="Elegant">Elegant</option>
                      <option value="Emotional">Emotional</option>
                      <option value="Aggressive">Aggressive</option>
                      <option value="Viral">Viral</option>
                      <option value="Loud">Loud</option>
                      <option value="Energetic">Energetic</option>
                      <option value="Futuristic">Futuristic</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Explosive">Explosive</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                </div>
              </div>

              {/* Row 2: Character Style & Pose */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                    Character Style <span className="bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded">CHARACTER</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={characterStyle}
                      onChange={(e) => setCharacterStyle(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Auto Character">Auto Character</option>
                      <option value="Male Model">Male Model</option>
                      <option value="Female Model">Female Model</option>
                      <option value="Muslim Male">Muslim Male</option>
                      <option value="Muslimah">Muslimah</option>
                      <option value="Kid / Child">Kid / Child</option>
                      <option value="Teenager">Teenager</option>
                      <option value="Gen-Z Creator">Gen-Z Creator</option>
                      <option value="Businessman">Businessman</option>
                      <option value="Office Worker">Office Worker</option>
                      <option value="Gamer">Gamer</option>
                      <option value="Athlete">Athlete</option>
                      <option value="Fashion Model">Fashion Model</option>
                      <option value="Couple">Couple</option>
                      <option value="No Human">No Human</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-gray-300">Character Pose</label>
                    <button className="text-[10px] text-gray-500 flex items-center gap-1 hover:text-gray-400">✎ CUSTOM</button>
                  </div>
                  <div className="relative mb-1">
                    <select 
                      value={characterPose}
                      onChange={(e) => setCharacterPose(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Auto (AI pilih)">Auto (AI pilih)</option>
                      <option value="Pointing toward headline">Pointing toward headline</option>
                      <option value="Holding product">Holding product</option>
                      <option value="Presenting / open hand gesture">Presenting / open hand gesture</option>
                      <option value="Arms crossed confident">Arms crossed confident</option>
                      <option value="Hands on hips">Hands on hips</option>
                      <option value="Looking at camera">Looking at camera</option>
                      <option value="Looking at product">Looking at product</option>
                      <option value="Thumbs up">Thumbs up</option>
                      <option value="Showing result / before-after">Showing result / before-after</option>
                      <option value="Walking toward camera">Walking toward camera</option>
                      <option value="Sitting relaxed">Sitting relaxed</option>
                      <option value="Leaning casual">Leaning casual</option>
                      <option value="Hands in pockets">Hands in pockets</option>
                      <option value="Surprised reaction">Surprised reaction</option>
                      <option value="Thinking pose">Thinking pose</option>
                      <option value="Candid laugh">Candid laugh</option>
                      <option value="Reaching out of frame">Reaching out of frame</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                  <p className="text-[10px] text-gray-500">Biar karakter gak cuma menunjuk. Pilih atau ketik custom.</p>
                </div>
              </div>

              {/* Row 3: Visual Intensity & Background System */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                    Visual Intensity <span className="bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded">INTENSITY</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={visualIntensity}
                      onChange={(e) => setVisualIntensity(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Balanced">Balanced</option>
                      <option value="High Contrast">High Contrast</option>
                      <option value="Soft / Low Contrast">Soft / Low Contrast</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                    Background System <span className="bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded">BG</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={backgroundSystem}
                      onChange={(e) => setBackgroundSystem(e.target.value)}
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="Solid Premium">Solid Premium</option>
                      <option value="Gradient Minimal">Gradient Minimal</option>
                      <option value="Studio Backdrop">Studio Backdrop</option>
                      <option value="Contextual Environment">Contextual Environment</option>
                      <option value="Transparent/Cutout">Transparent/Cutout</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                  </div>
                </div>
              </div>
              
              {/* Row 4: Tema Warna */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tema Warna</label>
                <div className="flex items-center gap-3">
                  <div className="relative overflow-hidden rounded-md border border-[#2a2a2a] w-12 h-10">
                    <input type="color" value={colorThemeLeft} onChange={(e) => setColorThemeLeft(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
                  </div>
                  <div className="relative overflow-hidden rounded-md border border-[#2a2a2a] w-12 h-10">
                    <input type="color" value={colorThemeRight} onChange={(e) => setColorThemeRight(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono flex flex-col gap-0.5">
                    <span>Kiri: <span className="text-white">{colorThemeLeft}</span></span>
                    <span>Kanan: <span className="text-white">{colorThemeRight}</span></span>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-[#1f1f1f] w-full my-2"></div>

              {/* Row 5: Aspect Ratio */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Aspect Ratio</label>
                <div className="relative">
                  <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                  >
                    <option value="1:1 (Instagram Square)">1:1 (Instagram Square)</option>
                    <option value="4:5 (Feed)">4:5 (Feed)</option>
                    <option value="16:9 (Landscape)">16:9 (Landscape)</option>
                    <option value="9:16 (Story)">9:16 (Story)</option>
                    <option value="Carousel Slide">Carousel Slide</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Right Panel: Dynamic (Mockup Wireframe + Terminal OR Full Terminal) */}
      <div className="flex-1 min-h-[600px] lg:min-h-0 bg-[#050505] relative flex flex-col p-6 overflow-hidden gap-6">

        {/* Mockup Wireframe (Only for specific modes) */}
        {['youtube', 'ads', 'review', 'design-feeds'].includes(mode) && (
          <div className="flex-1 border border-[#2a2a2a] rounded-xl flex flex-col overflow-hidden bg-[#0a0a0a]">
             {/* Header */}
             <div className="h-10 border-b border-[#2a2a2a] flex items-center justify-between px-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <LayoutGrid className="w-3.5 h-3.5 text-gray-300" /> MOCKUP WIREFRAME
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest">
                  {mode === 'youtube' ? '16:9' : '4:5'}
                </div>
             </div>
             
             {/* Mockup Canvas */}
             <div className="flex-1 bg-[#050505] p-6 flex items-center justify-center overflow-hidden">
               <div className={`
                 ${mode === 'youtube' ? 'aspect-video w-[80%]' : 'aspect-[4/5] h-[80%]'} 
                 bg-gradient-to-tr from-[#68e8cc] to-[#c7f4ed] rounded-lg relative shadow-2xl flex p-6 gap-4
               `}>
                 {/* Visual blocks inside the wireframe */}
                 {mode === 'youtube' ? (
                   <>
                     <div className="flex-1 flex flex-col justify-center gap-3 relative z-10">
                       <div className="w-3/4 h-3 bg-white/90 rounded"></div>
                       <div className="w-1/2 h-3 bg-white/70 rounded"></div>
                     </div>
                     <div className="w-[40%] bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 h-full"></div>
                   </>
                 ) : (
                   <div className="flex flex-col items-center justify-center w-full gap-4 relative z-10">
                     <div className="w-2/3 h-2 bg-white/80 rounded"></div>
                     <div className="w-1/2 h-2 bg-white/60 rounded"></div>
                     <div className="w-[80%] flex-1 bg-[#dcd7c6]/80 backdrop-blur-sm rounded-lg border border-black/5 mt-4 flex items-center justify-center">
                       {mode === 'review' && (
                         <div className="w-12 h-12 rounded-full bg-black/10"></div>
                       )}
                     </div>
                   </div>
                 )}
               </div>
             </div>

             {/* Status Boxes */}
             <div className="p-4 border-t border-[#2a2a2a] flex flex-wrap gap-2 bg-[#0f0f0f]">
                <div className="border border-[#2a2a2a] p-2 px-3 rounded bg-[#0a0a0a] min-w-[100px]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">STYLE</p>
                  <p className="text-xs text-white font-mono truncate">{aestheticStyle || "Minimal Clean"}</p>
                </div>
                <div className="border border-[#2a2a2a] p-2 px-3 rounded bg-[#0a0a0a] min-w-[80px]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">IMAGES</p>
                  <p className="text-xs text-white font-mono">1</p>
                </div>
                <div className="border border-[#2a2a2a] p-2 px-3 rounded bg-[#0a0a0a] min-w-[100px]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">POSITION</p>
                  <p className="text-xs text-white font-mono truncate">{visualPosition || "center"}</p>
                </div>
                <div className="border border-[#2a2a2a] p-2 px-3 rounded bg-[#0a0a0a] min-w-[120px]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{mode === 'youtube' ? 'MOOD' : 'LAYOUT'}</p>
                  <p className="text-xs text-white font-mono truncate">{mode === 'youtube' ? 'Shock' : 'Cinematic Layout'}</p>
                </div>
                <div className="border border-[#2a2a2a] p-2 px-3 rounded bg-[#0a0a0a] min-w-[120px]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{mode === 'youtube' ? 'LIGHTING' : 'ENERGY'}</p>
                  <p className="text-xs text-white font-mono truncate">{mode === 'youtube' ? (lightingStyle || 'Soft Lighting') : 'Premium'}</p>
                </div>
             </div>
          </div>
        )}

        {/* Terminal Content Area (Adjusts flex-1 or fixed height based on mode) */}
        <div className={`
          flex flex-col relative
          ${['youtube', 'ads', 'review', 'design-feeds'].includes(mode) ? 'h-[280px] shrink-0' : 'flex-1'}
        `}>
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-md border border-white/20">
                <Terminal className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Output Prompt</h3>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">JSON PROMPT</p>
              </div>
            </div>

            <button onClick={handleReset} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-[#2a2a2a] hover:bg-[#1a1a1a] rounded-md transition-colors flex items-center gap-2">
              <RotateCcw className="w-3 h-3" /> Riwayat
            </button>
          </div>

          <div className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">

          {/* Mock Mac Window Controls */}
          <div className="h-8 border-b border-[#2a2a2a] flex items-center px-4 gap-1.5 bg-[#0f0f0f]">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="mx-auto text-[10px] text-gray-500 font-mono uppercase tracking-wider">Terminal - idle</div>
          </div>

          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto">
            {/* Idle State */}
            {logs.length === 0 && !generatedPrompt && (
              <div className="text-gray-500 opacity-50 flex flex-col space-y-2">
                <p>{">_ PROMPT TERMINAL · IDLE"}</p>
                <p className="mt-4">{"> klik tombol Generate untuk build prompt"}</p>
                <p className="flex items-center gap-2">{"> awaiting input"} <span className="w-2 h-4 bg-white animate-pulse inline-block"></span></p>
              </div>
            )}

            {/* Terminal Logs */}
            <div className="text-gray-400 space-y-2 mb-6">
              {logs.map((log, i) => (
                <p key={i} className={log.startsWith("$") ? "text-white font-bold" : ""}>{log}</p>
              ))}
            </div>

            {/* Generated Prompt Output */}
            {generatedPrompt && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-xs text-gray-300/50 mb-2 uppercase tracking-widest border-b border-[#2a2a2a] pb-2">
                  -- PROMPT READY TO COPY --
                </div>
                <pre className="text-gray-300 font-mono text-xs leading-relaxed bg-[#111] p-4 rounded-lg border border-[#222] select-all whitespace-pre-wrap overflow-x-auto">
                  {generatedPrompt}
                </pre>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="h-16 border-t border-[#2a2a2a] bg-[#0f0f0f] flex items-center justify-between px-4 shrink-0">
            <div className="text-xs text-gray-500 font-mono">
              {isGenerating ? "GENERATING..." : generatedPrompt ? "READY TO COPY" : "IDLE - KLIK GENERATE"}
            </div>
            <div className="flex gap-2">
              {generatedPrompt && (
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${isCopied
                      ? "bg-white text-black text-white border border-green-500/20"
                      : "bg-[#1a1a1a] text-gray-300 hover:text-white border border-[#333] hover:border-gray-500"
                    }`}
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "Copied!" : "Copy Prompt"}
                </button>
              )}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-2 text-xs font-bold text-white bg-[#f73f43] hover:bg-white rounded-lg shadow-[0_0_15px_rgba(247,63,67,0.3)] disabled:opacity-50 transition-all flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                {isGenerating ? "Processing..." : t.generateBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
