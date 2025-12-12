const SUPPORTED_LANGS = {
    zh: "中文",
    en: "English",
    vi: "Tiếng Việt",
    fr: "Français",
    it: "Italiano",
    es: "Español"
};

// 所有语言选项（下拉框里用）
const ALL_LANGS = {
    ...SUPPORTED_LANGS,
    de: "Deutsch",
    ja: "日本語",
    ko: "한국어",
    ru: "Русский",
    ar: "العربية",
    pt: "Português"
};

// 多语言文案
const messages = {
    zh: {
        appTitle: "华南理工大学广州国际校区食堂评价系统",
        navBrand: "GZIC 食堂评价",
        navLogin: "登录",
        navLogout: "退出登录",
        navRegister: "注册",

        homeTitle: "欢迎来到华南理工大学广州国际校区食堂评价系统",
        homeEnter: "进入食堂评价系统",

        indexTitle: "请选择一个食堂查看或发布评价（D5 / F3 / B1）",
        indexPublish: "发布一条食堂评价",
        indexViewDetail: "查看该食堂详情",
        d5Title: "D5 食堂",
        f3Title: "F3 食堂",
        f5Title: "F5 食堂",
        b1Title: "B1 食堂",

        createdBy: "创建者",
        editCanteen: "编辑食堂信息",
        addReview: "新增评价",
        commentEdit: "编辑",
        commentDelete: "删除",
        commentReply: "回复",
        commentPin: "置顶",
        commentUnpin: "取消置顶",

        newReviewFor: "为",
        newReviewSuffix: "发表评价",
        replyToUser: "回复",
        reviewPlaceholder: "请输入评价内容",
        reviewSubmit: "提交",
        backToCanteen: "返回食堂详情",
        backToList: "返回列表",

        loginTitle: "用户登录",
        loginUsername: "用户名",
        loginPassword: "密码",
        loginSubmit: "登录",
        loginRegisterHint: "没有账号？",
        loginRegisterButton: "注册",

        registerTitle: "用户注册",
        registerSubmit: "提交",
        registerAdminHint: "管理员注册码（可选）",
        registerLoginHint: "已有账号？",
        registerLoginButton: "登录",

        translate: "翻译",
        langLabel: "语言",

        // 管理员相关
        adminBadge: "管理员",
        adminUserMenu: "用户管理",
        adminUserListTitle: "用户管理",
        adminUserSearchPlaceholder: "搜索用户名",
        adminUserSearchButton: "搜索",
        adminUserUsername: "用户名",
        adminUserRole: "角色",
        adminUserActions: "操作",
        adminUserRoleAdmin: "管理员",
        adminUserRoleUser: "普通用户",
        adminUserDeleteConfirm: "确定要删除该用户吗？",
        adminUserDeleteButton: "删除",
        adminUserSelfLabel: "当前账号",
        adminUserEmpty: "当前没有用户记录"
    },
    en: {
        appTitle: "GZIC Canteen Review System",
        navBrand: "GZIC Canteen Review",
        navLogin: "Login",
        navLogout: "Logout",
        navRegister: "Register",

        homeTitle: "Welcome to GZIC Canteen Review System",
        homeEnter: "Enter the review system",

        indexTitle: "Choose a canteen to view or post reviews (D5 / F3 / B1)",
        indexPublish: "Post a new canteen review",
        indexViewDetail: "View details",
        d5Title: "D5 Canteen",
        f3Title: "F3 Canteen",
        f5Title: "F5 Canteen",
        b1Title: "B1 Canteen",

        createdBy: "Created by",
        editCanteen: "Edit canteen info",
        addReview: "Add review",
        commentEdit: "Edit",
        commentDelete: "Delete",
        commentReply: "Reply",
        commentPin: "Pin",
        commentUnpin: "Unpin",

        newReviewFor: "Write a review for",
        newReviewSuffix: "",
        replyToUser: "Reply to",
        reviewPlaceholder: "Please enter your review",
        reviewSubmit: "Submit",
        backToCanteen: "Back to canteen",
        backToList: "Back to list",

        loginTitle: "Login",
        loginUsername: "Username",
        loginPassword: "Password",
        loginSubmit: "Login",
        loginRegisterHint: "No account yet?",
        loginRegisterButton: "Register",

        registerTitle: "Register",
        registerSubmit: "Submit",
        registerAdminHint: "Admin code (optional)",
        registerLoginHint: "Already have an account?",
        registerLoginButton: "Login",

        translate: "Translate",
        langLabel: "Language",

        // Admin
        adminBadge: "Admin",
        adminUserMenu: "User Management",
        adminUserListTitle: "User Management",
        adminUserSearchPlaceholder: "Search username",
        adminUserSearchButton: "Search",
        adminUserUsername: "Username",
        adminUserRole: "Role",
        adminUserActions: "Actions",
        adminUserRoleAdmin: "Admin",
        adminUserRoleUser: "User",
        adminUserDeleteConfirm: "Are you sure you want to delete this user?",
        adminUserDeleteButton: "Delete",
        adminUserSelfLabel: "Current account",
        adminUserEmpty: "No users found"
    },
    vi: {
        appTitle: "Hệ thống đánh giá căng tin GZIC",
        navBrand: "Đánh giá căng tin GZIC",
        navLogin: "Đăng nhập",
        navLogout: "Đăng xuất",
        navRegister: "Đăng ký",

        homeTitle: "Chào mừng đến hệ thống đánh giá căng tin GZIC",
        homeEnter: "Vào hệ thống đánh giá",

        indexTitle: "Chọn một căng tin để xem hoặc viết đánh giá (D5 / F3 / B1)",
        indexPublish: "Viết đánh giá mới cho căng tin",
        indexViewDetail: "Xem chi tiết",
        d5Title: "Căng tin D5",
        f3Title: "Căng tin F3",
        f5Title: "Căng tin F5",
        b1Title: "Căng tin B1",

        createdBy: "Tạo bởi",
        editCanteen: "Sửa thông tin căng tin",
        addReview: "Thêm đánh giá",
        commentEdit: "Sửa",
        commentDelete: "Xóa",
        commentReply: "Trả lời",
        commentPin: "Ghim",
        commentUnpin: "Bỏ ghim",

        newReviewFor: "Viết đánh giá cho",
        newReviewSuffix: "",
        replyToUser: "Trả lời",
        reviewPlaceholder: "Nhập nội dung đánh giá",
        reviewSubmit: "Gửi",
        backToCanteen: "Quay lại trang căng tin",
        backToList: "Quay lại danh sách",

        loginTitle: "Đăng nhập",
        loginUsername: "Tên đăng nhập",
        loginPassword: "Mật khẩu",
        loginSubmit: "Đăng nhập",
        loginRegisterHint: "Chưa có tài khoản?",
        loginRegisterButton: "Đăng ký",

        registerTitle: "Đăng ký",
        registerSubmit: "Gửi",
        registerAdminHint: "Mã quản trị (không bắt buộc)",
        registerLoginHint: "Đã có tài khoản?",
        registerLoginButton: "Đăng nhập",

        translate: "Dịch",
        langLabel: "Ngôn ngữ",

        // Admin
        adminBadge: "Quản trị viên",
        adminUserMenu: "Quản lý người dùng",
        adminUserListTitle: "Quản lý người dùng",
        adminUserSearchPlaceholder: "Tìm kiếm tên người dùng",
        adminUserSearchButton: "Tìm kiếm",
        adminUserUsername: "Tên người dùng",
        adminUserRole: "Vai trò",
        adminUserActions: "Thao tác",
        adminUserRoleAdmin: "Quản trị viên",
        adminUserRoleUser: "Người dùng",
        adminUserDeleteConfirm: "Bạn có chắc muốn xóa người dùng này không?",
        adminUserDeleteButton: "Xóa",
        adminUserSelfLabel: "Tài khoản hiện tại",
        adminUserEmpty: "Không có người dùng nào"
    },
    fr: {
        appTitle: "Système d'avis des cantines GZIC",
        navBrand: "Avis cantines GZIC",
        navLogin: "Connexion",
        navLogout: "Déconnexion",
        navRegister: "Inscription",

        homeTitle: "Bienvenue sur le système d'avis des cantines GZIC",
        homeEnter: "Entrer dans le système",

        indexTitle: "Choisissez une cantine pour voir ou publier des avis (D5 / F3 / B1)",
        indexPublish: "Publier un nouvel avis",
        indexViewDetail: "Voir les détails",
        d5Title: "Cantine D5",
        f3Title: "Cantine F3",
        f5Title: "Cantine F5",
        b1Title: "Cantine B1",

        createdBy: "Créé par",
        editCanteen: "Modifier les informations de la cantine",
        addReview: "Ajouter un avis",
        commentEdit: "Modifier",
        commentDelete: "Supprimer",
        commentReply: "Répondre",
        commentPin: "Épingler",
        commentUnpin: "Désépingler",

        newReviewFor: "Rédiger un avis pour",
        newReviewSuffix: "",
        replyToUser: "Répondre à",
        reviewPlaceholder: "Saisissez votre avis",
        reviewSubmit: "Envoyer",
        backToCanteen: "Retour à la cantine",
        backToList: "Retour à la liste",

        loginTitle: "Connexion",
        loginUsername: "Nom d'utilisateur",
        loginPassword: "Mot de passe",
        loginSubmit: "Connexion",
        loginRegisterHint: "Pas encore de compte ?",
        loginRegisterButton: "S'inscrire",

        registerTitle: "Inscription",
        registerSubmit: "Valider",
        registerAdminHint: "Code administrateur (optionnel)",
        registerLoginHint: "Déjà un compte ?",
        registerLoginButton: "Se connecter",

        translate: "Traduire",
        langLabel: "Langue",

        // Admin
        adminBadge: "Admin",
        adminUserMenu: "Gestion des utilisateurs",
        adminUserListTitle: "Gestion des utilisateurs",
        adminUserSearchPlaceholder: "Rechercher un nom d'utilisateur",
        adminUserSearchButton: "Rechercher",
        adminUserUsername: "Nom d'utilisateur",
        adminUserRole: "Rôle",
        adminUserActions: "Actions",
        adminUserRoleAdmin: "Administrateur",
        adminUserRoleUser: "Utilisateur",
        adminUserDeleteConfirm: "Voulez-vous vraiment supprimer cet utilisateur ?",
        adminUserDeleteButton: "Supprimer",
        adminUserSelfLabel: "Compte actuel",
        adminUserEmpty: "Aucun utilisateur trouvé"
    },
    it: {
        appTitle: "Sistema di recensioni delle mense GZIC",
        navBrand: "Recensioni mense GZIC",
        navLogin: "Accedi",
        navLogout: "Esci",
        navRegister: "Registrati",

        homeTitle: "Benvenuto nel sistema di recensioni delle mense GZIC",
        homeEnter: "Entra nel sistema",

        indexTitle: "Scegli una mensa per vedere o pubblicare recensioni (D5 / F3 / B1)",
        indexPublish: "Pubblica una nuova recensione",
        indexViewDetail: "Vedi dettagli",
        d5Title: "Mensa D5",
        f3Title: "Mensa F3",
        f5Title: "Mensa F5",
        b1Title: "Mensa B1",

        createdBy: "Creato da",
        editCanteen: "Modifica informazioni mensa",
        addReview: "Aggiungi recensione",
        commentEdit: "Modifica",
        commentDelete: "Elimina",
        commentReply: "Rispondi",
        commentPin: "Fissa in alto",
        commentUnpin: "Rimuovi fissaggio",

        newReviewFor: "Scrivi una recensione per",
        newReviewSuffix: "",
        replyToUser: "Rispondi a",
        reviewPlaceholder: "Inserisci la tua recensione",
        reviewSubmit: "Invia",
        backToCanteen: "Torna alla mensa",
        backToList: "Torna alla lista",

        loginTitle: "Accesso",
        loginUsername: "Nome utente",
        loginPassword: "Password",
        loginSubmit: "Accedi",
        loginRegisterHint: "Non hai un account?",
        loginRegisterButton: "Registrati",

        registerTitle: "Registrazione",
        registerSubmit: "Invia",
        registerAdminHint: "Codice admin (opzionale)",
        registerLoginHint: "Hai già un account?",
        registerLoginButton: "Accedi",

        translate: "Traduci",
        langLabel: "Lingua",

        // Admin
        adminBadge: "Admin",
        adminUserMenu: "Gestione utenti",
        adminUserListTitle: "Gestione utenti",
        adminUserSearchPlaceholder: "Cerca nome utente",
        adminUserSearchButton: "Cerca",
        adminUserUsername: "Nome utente",
        adminUserRole: "Ruolo",
        adminUserActions: "Azioni",
        adminUserRoleAdmin: "Amministratore",
        adminUserRoleUser: "Utente",
        adminUserDeleteConfirm: "Sei sicuro di voler eliminare questo utente?",
        adminUserDeleteButton: "Elimina",
        adminUserSelfLabel: "Account corrente",
        adminUserEmpty: "Nessun utente trovato"
    },
    es: {
        appTitle: "Sistema de reseñas de comedores GZIC",
        navBrand: "Reseñas de comedores GZIC",
        navLogin: "Iniciar sesión",
        navLogout: "Cerrar sesión",
        navRegister: "Registrarse",

        homeTitle: "Bienvenido al sistema de reseñas de comedores GZIC",
        homeEnter: "Entrar al sistema",

        indexTitle: "Elige un comedor para ver o publicar reseñas (D5 / F3 / B1)",
        indexPublish: "Publicar una nueva reseña",
        indexViewDetail: "Ver detalles",
        d5Title: "Comedor D5",
        f3Title: "Comedor F3",
        f5Title: "Comedor F5",
        b1Title: "Comedor B1",

        createdBy: "Creado por",
        editCanteen: "Editar información del comedor",
        addReview: "Añadir reseña",
        commentEdit: "Editar",
        commentDelete: "Eliminar",
        commentReply: "Responder",
        commentPin: "Fijar",
        commentUnpin: "Quitar fijado",

        newReviewFor: "Escribir una reseña para",
        newReviewSuffix: "",
        replyToUser: "Responder a",
        reviewPlaceholder: "Escribe tu reseña",
        reviewSubmit: "Enviar",
        backToCanteen: "Volver al comedor",
        backToList: "Volver a la lista",

        loginTitle: "Iniciar sesión",
        loginUsername: "Usuario",
        loginPassword: "Contraseña",
        loginSubmit: "Entrar",
        loginRegisterHint: "¿Aún no tienes cuenta?",
        loginRegisterButton: "Registrarse",

        registerTitle: "Registro",
        registerSubmit: "Enviar",
        registerAdminHint: "Código de administrador (opcional)",
        registerLoginHint: "¿Ya tienes cuenta?",
        registerLoginButton: "Iniciar sesión",

        translate: "Traducir",
        langLabel: "Idioma",

        // Admin
        adminBadge: "Admin",
        adminUserMenu: "Gestión de usuarios",
        adminUserListTitle: "Gestión de usuarios",
        adminUserSearchPlaceholder: "Buscar nombre de usuario",
        adminUserSearchButton: "Buscar",
        adminUserUsername: "Nombre de usuario",
        adminUserRole: "Rol",
        adminUserActions: "Acciones",
        adminUserRoleAdmin: "Administrador",
        adminUserRoleUser: "Usuario",
        adminUserDeleteConfirm: "¿Seguro que quieres eliminar a este usuario?",
        adminUserDeleteButton: "Eliminar",
        adminUserSelfLabel: "Cuenta actual",
        adminUserEmpty: "No se encontraron usuarios"
    },
    de: {
        appTitle: "GZIC Mensabewertungssystem",
        navBrand: "GZIC Mensabewertungen",
        navLogin: "Anmelden",
        navLogout: "Abmelden",
        navRegister: "Registrieren",

        homeTitle: "Willkommen im GZIC Mensabewertungssystem",
        homeEnter: "Zum Bewertungssystem",

        indexTitle: "Wähle eine Mensa aus, um Bewertungen anzusehen oder zu schreiben (D5 / F3 / B1)",
        indexPublish: "Neue Mensabewertung schreiben",
        indexViewDetail: "Details anzeigen",
        d5Title: "Mensa D5",
        f3Title: "Mensa F3",
        f5Title: "Mensa F5",
        b1Title: "Mensa B1",

        createdBy: "Erstellt von",
        editCanteen: "Mensa-Informationen bearbeiten",
        addReview: "Bewertung hinzufügen",
        commentEdit: "Bearbeiten",
        commentDelete: "Löschen",
        commentReply: "Antworten",
        commentPin: "Anheften",
        commentUnpin: "Anheftung entfernen",

        newReviewFor: "Bewertung schreiben für",
        newReviewSuffix: "",
        replyToUser: "Antwort an",
        reviewPlaceholder: "Bitte gib deine Bewertung ein",
        reviewSubmit: "Absenden",
        backToCanteen: "Zurück zur Mensa",
        backToList: "Zurück zur Liste",

        loginTitle: "Anmeldung",
        loginUsername: "Benutzername",
        loginPassword: "Passwort",
        loginSubmit: "Anmelden",
        loginRegisterHint: "Noch kein Konto?",
        loginRegisterButton: "Registrieren",

        registerTitle: "Registrierung",
        registerSubmit: "Abschicken",
        registerAdminHint: "Admin-Code (optional)",
        registerLoginHint: "Schon ein Konto?",
        registerLoginButton: "Anmelden",

        translate: "Übersetzen",
        langLabel: "Sprache",

        // Admin
        adminBadge: "Admin",
        adminUserMenu: "Benutzerverwaltung",
        adminUserListTitle: "Benutzerverwaltung",
        adminUserSearchPlaceholder: "Benutzername suchen",
        adminUserSearchButton: "Suchen",
        adminUserUsername: "Benutzername",
        adminUserRole: "Rolle",
        adminUserActions: "Aktionen",
        adminUserRoleAdmin: "Administrator",
        adminUserRoleUser: "Benutzer",
        adminUserDeleteConfirm: "Möchten Sie diesen Benutzer wirklich löschen?",
        adminUserDeleteButton: "Löschen",
        adminUserSelfLabel: "Aktuelles Konto",
        adminUserEmpty: "Keine Benutzer gefunden"
    },
    ja: {
        appTitle: "GZIC 食堂評価システム",
        navBrand: "GZIC 食堂評価",
        navLogin: "ログイン",
        navLogout: "ログアウト",
        navRegister: "登録",

        homeTitle: "GZIC 食堂評価システムへようこそ",
        homeEnter: "評価システムに入る",

        indexTitle: "食堂を選んで評価を閲覧または投稿してください（D5 / F3 / B1）",
        indexPublish: "新しい食堂レビューを投稿",
        indexViewDetail: "詳細を見る",
        d5Title: "D5 食堂",
        f3Title: "F3 食堂",
        f5Title: "F5 食堂",
        b1Title: "B1 食堂",

        createdBy: "作成者",
        editCanteen: "食堂情報を編集",
        addReview: "レビューを追加",
        commentEdit: "編集",
        commentDelete: "削除",
        commentReply: "返信",
        commentPin: "固定",
        commentUnpin: "固定解除",

        newReviewFor: "レビュー対象：",
        newReviewSuffix: "",
        replyToUser: "返信先：",
        reviewPlaceholder: "レビュー内容を入力してください",
        reviewSubmit: "送信",
        backToCanteen: "食堂の詳細に戻る",
        backToList: "リストに戻る",

        loginTitle: "ログイン",
        loginUsername: "ユーザー名",
        loginPassword: "パスワード",
        loginSubmit: "ログイン",
        loginRegisterHint: "アカウントをお持ちでないですか？",
        loginRegisterButton: "登録",

        registerTitle: "ユーザー登録",
        registerSubmit: "送信",
        registerAdminHint: "管理者コード（任意）",
        registerLoginHint: "すでにアカウントがありますか？",
        registerLoginButton: "ログイン",

        translate: "翻訳",
        langLabel: "言語",

        // Admin
        adminBadge: "管理者",
        adminUserMenu: "ユーザー管理",
        adminUserListTitle: "ユーザー管理",
        adminUserSearchPlaceholder: "ユーザー名を検索",
        adminUserSearchButton: "検索",
        adminUserUsername: "ユーザー名",
        adminUserRole: "役割",
        adminUserActions: "操作",
        adminUserRoleAdmin: "管理者",
        adminUserRoleUser: "ユーザー",
        adminUserDeleteConfirm: "このユーザーを削除してもよろしいですか？",
        adminUserDeleteButton: "削除",
        adminUserSelfLabel: "現在のアカウント",
        adminUserEmpty: "ユーザーが見つかりません"
    },
    ko: {
        appTitle: "GZIC 식당 평가 시스템",
        navBrand: "GZIC 식당 평가",
        navLogin: "로그인",
        navLogout: "로그아웃",
        navRegister: "회원가입",

        homeTitle: "GZIC 식당 평가 시스템에 오신 것을 환영합니다",
        homeEnter: "평가 시스템으로 이동",

        indexTitle: "식당을 선택하여 평가를 확인하거나 작성하세요 (D5 / F3 / B1)",
        indexPublish: "새 식당 평가 작성",
        indexViewDetail: "자세히 보기",
        d5Title: "D5 식당",
        f3Title: "F3 식당",
        f5Title: "F5 식당",
        b1Title: "B1 식당",

        createdBy: "작성자",
        editCanteen: "식당 정보 수정",
        addReview: "평가 추가",
        commentEdit: "수정",
        commentDelete: "삭제",
        commentReply: "답글",
        commentPin: "고정",
        commentUnpin: "고정 해제",

        newReviewFor: "평가 작성 대상:",
        newReviewSuffix: "",
        replyToUser: "답글 대상:",
        reviewPlaceholder: "평가 내용을 입력하세요",
        reviewSubmit: "등록",
        backToCanteen: "식당 상세로 돌아가기",
        backToList: "목록으로 돌아가기",

        loginTitle: "로그인",
        loginUsername: "사용자 이름",
        loginPassword: "비밀번호",
        loginSubmit: "로그인",
        loginRegisterHint: "계정이 없나요?",
        loginRegisterButton: "회원가입",

        registerTitle: "회원가입",
        registerSubmit: "등록",
        registerAdminHint: "관리자 코드 (선택)",
        registerLoginHint: "이미 계정이 있나요?",
        registerLoginButton: "로그인",

        translate: "번역",
        langLabel: "언어",

        // Admin
        adminBadge: "관리자",
        adminUserMenu: "사용자 관리",
        adminUserListTitle: "사용자 관리",
        adminUserSearchPlaceholder: "사용자 이름 검색",
        adminUserSearchButton: "검색",
        adminUserUsername: "사용자 이름",
        adminUserRole: "역할",
        adminUserActions: "작업",
        adminUserRoleAdmin: "관리자",
        adminUserRoleUser: "사용자",
        adminUserDeleteConfirm: "이 사용자를 삭제하시겠습니까?",
        adminUserDeleteButton: "삭제",
        adminUserSelfLabel: "현재 계정",
        adminUserEmpty: "사용자를 찾을 수 없습니다"
    },
    ru: {
        appTitle: "Система отзывов о столовых GZIC",
        navBrand: "Отзывы о столовых GZIC",
        navLogin: "Войти",
        navLogout: "Выйти",
        navRegister: "Регистрация",

        homeTitle: "Добро пожаловать в систему отзывов о столовых GZIC",
        homeEnter: "Перейти к системе отзывов",

        indexTitle: "Выберите столовую, чтобы просмотреть или оставить отзыв (D5 / F3 / B1)",
        indexPublish: "Оставить новый отзыв о столовой",
        indexViewDetail: "Просмотреть детали",
        d5Title: "Столовая D5",
        f3Title: "Столовая F3",
        f5Title: "Столовая F5",
        b1Title: "Столовая B1",

        createdBy: "Автор",
        editCanteen: "Редактировать информацию о столовой",
        addReview: "Добавить отзыв",
        commentEdit: "Редактировать",
        commentDelete: "Удалить",
        commentReply: "Ответить",
        commentPin: "Закрепить",
        commentUnpin: "Открепить",

        newReviewFor: "Написать отзыв о",
        newReviewSuffix: "",
        replyToUser: "Ответить",
        reviewPlaceholder: "Введите текст отзыва",
        reviewSubmit: "Отправить",
        backToCanteen: "Вернуться к столовой",
        backToList: "Вернуться к списку",

        loginTitle: "Вход",
        loginUsername: "Имя пользователя",
        loginPassword: "Пароль",
        loginSubmit: "Войти",
        loginRegisterHint: "Нет аккаунта?",
        loginRegisterButton: "Регистрация",

        registerTitle: "Регистрация",
        registerSubmit: "Отправить",
        registerAdminHint: "Код администратора (необязательно)",
        registerLoginHint: "Уже есть аккаунт?",
        registerLoginButton: "Войти",

        translate: "Перевести",
        langLabel: "Язык",

        // Admin
        adminBadge: "Администратор",
        adminUserMenu: "Управление пользователями",
        adminUserListTitle: "Управление пользователями",
        adminUserSearchPlaceholder: "Поиск имени пользователя",
        adminUserSearchButton: "Поиск",
        adminUserUsername: "Имя пользователя",
        adminUserRole: "Роль",
        adminUserActions: "Действия",
        adminUserRoleAdmin: "Администратор",
        adminUserRoleUser: "Пользователь",
        adminUserDeleteConfirm: "Вы уверены, что хотите удалить этого пользователя?",
        adminUserDeleteButton: "Удалить",
        adminUserSelfLabel: "Текущая учетная запись",
        adminUserEmpty: "Пользователи не найдены"
    },
    ar: {
        appTitle: "نظام تقييم مطاعم GZIC",
        navBrand: "تقييم مطاعم GZIC",
        navLogin: "تسجيل الدخول",
        navLogout: "تسجيل الخروج",
        navRegister: "تسجيل",

        homeTitle: "مرحبًا بك في نظام تقييم مطاعم GZIC",
        homeEnter: "الدخول إلى نظام التقييم",

        indexTitle: "اختر مطعمًا لعرض أو إضافة تقييم (D5 / F3 / B1)",
        indexPublish: "إضافة تقييم جديد للمطعم",
        indexViewDetail: "عرض التفاصيل",
        d5Title: "مطعم D5",
        f3Title: "مطعم F3",
        f5Title: "مطعم F5",
        b1Title: "مطعم B1",

        createdBy: "أنشأه",
        editCanteen: "تعديل معلومات المطعم",
        addReview: "إضافة تقييم",
        commentEdit: "تعديل",
        commentDelete: "حذف",
        commentReply: "رد",
        commentPin: "تثبيت",
        commentUnpin: "إلغاء التثبيت",

        newReviewFor: "كتابة تقييم لـ",
        newReviewSuffix: "",
        replyToUser: "الرد على",
        reviewPlaceholder: "يرجى إدخال نص التقييم",
        reviewSubmit: "إرسال",
        backToCanteen: "العودة إلى تفاصيل المطعم",
        backToList: "العودة إلى القائمة",

        loginTitle: "تسجيل الدخول",
        loginUsername: "اسم المستخدم",
        loginPassword: "كلمة المرور",
        loginSubmit: "تسجيل الدخول",
        loginRegisterHint: "لا تملك حسابًا؟",
        loginRegisterButton: "تسجيل",

        registerTitle: "تسجيل مستخدم",
        registerSubmit: "إرسال",
        registerAdminHint: "رمز المدير (اختياري)",
        registerLoginHint: "لديك حساب بالفعل؟",
        registerLoginButton: "تسجيل الدخول",

        translate: "ترجمة",
        langLabel: "اللغة",

        // Admin
        adminBadge: "المسؤول",
        adminUserMenu: "إدارة المستخدمين",
        adminUserListTitle: "إدارة المستخدمين",
        adminUserSearchPlaceholder: "بحث عن اسم المستخدم",
        adminUserSearchButton: "بحث",
        adminUserUsername: "اسم المستخدم",
        adminUserRole: "الدور",
        adminUserActions: "الإجراءات",
        adminUserRoleAdmin: "مسؤول",
        adminUserRoleUser: "مستخدم",
        adminUserDeleteConfirm: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
        adminUserDeleteButton: "حذف",
        adminUserSelfLabel: "الحساب الحالي",
        adminUserEmpty: "لا توجد مستخدمين"
    },
    pt: {
        appTitle: "Sistema de avaliações dos refeitórios GZIC",
        navBrand: "Avaliações dos refeitórios GZIC",
        navLogin: "Entrar",
        navLogout: "Sair",
        navRegister: "Registrar",

        homeTitle: "Bem-vindo ao sistema de avaliações dos refeitórios GZIC",
        homeEnter: "Entrar no sistema de avaliações",

        indexTitle: "Escolha um refeitório para ver ou publicar avaliações (D5 / F3 / B1)",
        indexPublish: "Publicar uma nova avaliação",
        indexViewDetail: "Ver detalhes",
        d5Title: "Refeitório D5",
        f3Title: "Refeitório F3",
        f5Title: "Refeitório F5",
        b1Title: "Refeitório B1",

        createdBy: "Criado por",
        editCanteen: "Editar informações do refeitório",
        addReview: "Adicionar avaliação",
        commentEdit: "Editar",
        commentDelete: "Excluir",
        commentReply: "Responder",
        commentPin: "Fixar",
        commentUnpin: "Desafixar",

        newReviewFor: "Escrever uma avaliação para",
        newReviewSuffix: "",
        replyToUser: "Responder a",
        reviewPlaceholder: "Digite sua avaliação",
        reviewSubmit: "Enviar",
        backToCanteen: "Voltar ao refeitório",
        backToList: "Voltar à lista",

        loginTitle: "Entrar",
        loginUsername: "Nome de usuário",
        loginPassword: "Senha",
        loginSubmit: "Entrar",
        loginRegisterHint: "Ainda não tem conta?",
        loginRegisterButton: "Registrar",

        registerTitle: "Registrar",
        registerSubmit: "Enviar",
        registerAdminHint: "Código de administrador (opcional)",
        registerLoginHint: "Já tem uma conta?",
        registerLoginButton: "Entrar",

        translate: "Traduzir",
        langLabel: "Idioma",

        // Admin
        adminBadge: "Administrador",
        adminUserMenu: "Gestão de usuários",
        adminUserListTitle: "Gestão de usuários",
        adminUserSearchPlaceholder: "Pesquisar nome de usuário",
        adminUserSearchButton: "Pesquisar",
        adminUserUsername: "Nome de usuário",
        adminUserRole: "Papel",
        adminUserActions: "Ações",
        adminUserRoleAdmin: "Administrador",
        adminUserRoleUser: "Usuário",
        adminUserDeleteConfirm: "Tem certeza de que deseja excluir este usuário?",
        adminUserDeleteButton: "Excluir",
        adminUserSelfLabel: "Conta atual",
        adminUserEmpty: "Nenhum usuário encontrado"
    }
};

function i18nMiddleware(req, res, next) {
    let lang = (req.query.lang || req.session.lang || "zh").toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(messages, lang)) {
        lang = "zh";
    }
    req.session.lang = lang;

    res.locals.lang = lang;
    res.locals.supportedLangs = SUPPORTED_LANGS;
    res.locals.allLangs = ALL_LANGS;

    res.locals.t = function (key) {
        const table = messages[lang] || {};
        if (Object.prototype.hasOwnProperty.call(table, key)) {
            return table[key];
        }
        const zhTable = messages.zh || {};
        return zhTable[key] || key;
    };

    next();
}

module.exports = {
    i18nMiddleware,
    SUPPORTED_LANGS,
    ALL_LANGS,
    messages
};
