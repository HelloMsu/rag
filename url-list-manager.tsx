"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Link,
  Plus,
  Clock,
  Search,
  RefreshCw,
  Info,
  CheckCircle,
  Trash2,
  FileText,
  User,
  LogOut,
  Settings,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UrlItem {
  id: string
  selected: boolean
  title: string
  status: "success" | "failed" | "processing" | "pending"
  lastModified: string
  category?: string
}

const urlData: UrlItem[] = [
  {
    id: "1",
    selected: false,
    title: "컴퓨터구조 - 강의계획서",
    status: "success",
    lastModified: "2025-07-01",
    category: "학칙",
  },
  {
    id: "2",
    selected: false,
    title: "오픈소스SW - 공지사항",
    status: "failed",
    lastModified: "2025-07-01",
    category: "FAQ",
  },
  {
    id: "3",
    selected: false,
    title: "데이터베이스 중간고사 안내",
    status: "processing",
    lastModified: "2025-06-25",
    category: "학칙",
  },
  {
    id: "4",
    selected: false,
    title: "네트워크 프로그래밍 과제",
    status: "pending",
    lastModified: "2025-06-20",
    category: "FAQ",
  },
]

interface UrlListManagerProps {
  onMenuChange: (menu: string) => void
}

export default function UrlListManager({ onMenuChange }: UrlListManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [urls, setUrls] = useState(urlData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddUrlOpen, setIsAddUrlOpen] = useState(false)
  const [urlAddress, setUrlAddress] = useState("")
  const [urlDescription, setUrlDescription] = useState("")
  const [category, setCategory] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "성공"
      case "failed":
        return "실패"
      case "processing":
        return "진행중"
      case "pending":
        return "대기중"
      default:
        return "알 수 없음"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "failed":
        return "destructive"
      case "processing":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      case "processing":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setUrls(urls.map((url) => ({ ...url, selected: checked })))
  }

  const handleSelectUrl = (id: string, checked: boolean) => {
    setUrls(urls.map((url) => (url.id === id ? { ...url, selected: checked } : url)))
  }

  const handleBulkDelete = () => {
    const selectedIds = urls.filter((url) => url.selected).map((url) => url.id)
    if (selectedIds.length === 0) return

    if (confirm(`선택된 ${selectedIds.length}개 URL을 삭제하시겠습니까?`)) {
      setUrls(urls.filter((url) => !url.selected))
    }
  }

  const handleAddUrl = () => {
    console.log("Adding URL:", {
      url: urlAddress,
      description: urlDescription,
      category: category,
    })
    setIsAddUrlOpen(false)
    setUrlAddress("")
    setUrlDescription("")
    setCategory("")
  }

  const filteredUrls = urls.filter((url) => {
    const matchesSearch = url.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || url.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: urls.length,
    success: urls.filter((p) => p.status === "success").length,
    failed: urls.filter((p) => p.status === "failed").length,
    processing: urls.filter((p) => p.status === "processing").length,
    pending: urls.filter((p) => p.status === "pending").length,
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 영역 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Storage Manager</h1>
              <p className="text-sm text-gray-500">문서 관리 시스템</p>
            </div>
          </div>

          {/* 로그인 관련 기능 */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              설정
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="사용자" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">관리자</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  프로필
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  계정 설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">데이터 소스</h2>
            <p className="text-sm text-gray-500">문서 관리</p>
          </div>

          <nav className="space-y-2">
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-50"
              onClick={() => onMenuChange("document")}
            >
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Document</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Link className="h-4 w-4" />
              <span className="text-sm font-medium">URL list</span>
            </div>
          </nav>
        </div>

        {/* 중앙 메인 콘텐츠 */}
        <div className="flex-1 p-6 overflow-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Link className="h-6 w-6" />
                URL list 수집 설정
              </h1>
              <p className="text-gray-600 mt-1">웹페이지 URL을 통해 콘텐츠를 수집합니다.</p>
            </div>
          </div>

          {/* 검색 바 */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="제목으로 검색"
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="학칙">학칙</SelectItem>
                    <SelectItem value="FAQ">FAQ</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Search className="h-4 w-4" />
                  검색
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 수집된 URL 목록 */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    수집된 URL 목록
                  </CardTitle>
                  <CardDescription>웹페이지에서 수집된 콘텐츠 목록입니다</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    새로 고치기
                  </Button>
                  <Button size="sm" className="flex items-center gap-2" onClick={() => setIsAddUrlOpen(true)}>
                    <Plus className="h-4 w-4" />
                    URL 추가
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 통계 요약 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">총 수집</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">성공</p>
                    <p className="text-2xl font-bold text-green-600">{stats.success}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">실패</p>
                    <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">진행중</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">대기중</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                </div>
              </div>

              {/* 일괄 작업 버튼 */}
              {urls.some((url) => url.selected) && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-800">
                      {urls.filter((url) => url.selected).length}개 URL이 선택됨
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkDelete}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                      선택 항목 삭제
                    </Button>
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox checked={urls.every((url) => url.selected)} onCheckedChange={handleSelectAll} />
                    </TableHead>
                    <TableHead className="text-left w-24">카테고리</TableHead>
                    <TableHead className="text-left">제목</TableHead>
                    <TableHead className="text-right w-32">상태</TableHead>
                    <TableHead className="text-right w-32">수정일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUrls.map((url) => (
                    <TableRow key={url.id}>
                      <TableCell>
                        <Checkbox
                          checked={url.selected}
                          onCheckedChange={(checked) => handleSelectUrl(url.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {url.category}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{url.title}</TableCell>
                      <TableCell className="text-right">
                        <div className={`flex items-center justify-end gap-2 ${getStatusColor(url.status)}`}>
                          {getStatusIcon(url.status)}
                          <span className="text-sm font-medium">{getStatusText(url.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-gray-600">{url.lastModified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 안내 문구 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">URL 수집 안내</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 웹페이지의 텍스트 콘텐츠만 수집됩니다.</li>
                    <li>• 수집된 콘텐츠는 자동으로 벡터DB에 임베딩됩니다.</li>
                    <li>• 자동 동기화는 매일 새벽 3시에 실행되며, 변경 감지 방식은 수정일 기준입니다.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddUrlOpen} onOpenChange={setIsAddUrlOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              URL 추가
            </DialogTitle>
            <DialogDescription>새로운 웹페이지 URL을 추가하여 콘텐츠를 수집합니다</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="학칙">학칙</SelectItem>
                  <SelectItem value="FAQ">FAQ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">URL</Label>
              <Input
                value={urlAddress}
                onChange={(e) => setUrlAddress(e.target.value)}
                placeholder="https://example.com/page"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">수집할 웹페이지의 URL을 입력하세요</p>
            </div>

            <div>
              <Label className="text-sm font-medium">설명 (META)</Label>
              <Textarea
                value={urlDescription}
                onChange={(e) => setUrlDescription(e.target.value)}
                placeholder="URL에 대한 간단한 설명을 입력하세요"
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddUrlOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddUrl}>URL 추가</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
