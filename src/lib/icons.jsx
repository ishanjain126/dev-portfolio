import {
  Boxes, Box, Building2, Radio, Video, Cloud, Zap, Users, User, PenTool, Webhook,
  AppWindow, Settings, Database, FileText, Sparkles, Layers, Puzzle, FlaskConical,
  Check, Code2, Cpu, Gauge, Tag, Smartphone, Server, Globe, ArrowLeftRight,
  Mail, Phone, Linkedin, Github, MessageCircle, X, Send, Command, Search,
  ChevronDown, Mic, ArrowRight, Languages
} from 'lucide-react'

const map = {
  Boxes, Box, Building2, Radio, Video, Cloud, Zap, Users, User, PenTool, Webhook,
  AppWindow, Settings, Database, FileText, Sparkles, Layers, Puzzle, FlaskConical,
  Check, Code2, Cpu, Gauge, Tag, Smartphone, Server, Globe, ArrowLeftRight,
  Mail, Phone, Linkedin, Github, MessageCircle, X, Send, Command, Search,
  ChevronDown, Mic, ArrowRight, Languages
}

export default function Icon({ name, ...props }) {
  const Cmp = map[name] || Box
  return <Cmp {...props} />
}
