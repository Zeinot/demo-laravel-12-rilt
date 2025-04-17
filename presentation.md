# Présentation du Système de Gestion des Tâches (Todos)

## 1. Introduction à l'Application

**Titre:** Implémentation d'un Système de Gestion des Tâches avec Laravel 12 et React

**Explications:** Cette application utilise Laravel 12 comme framework backend et React avec ShadcnUI pour le frontend. L'objectif est de créer un système de gestion des tâches (todos) complet avec authentification des utilisateurs et fonctionnalités CRUD.

**Fichiers concernés:**

- `app/Models/Todo.php` - Définition du modèle Todo avec ses relations et attributs
- `database/migrations/2025_04_17_174106_create_todos_table.php` - Migration pour créer la table todos

## 2. Création des Modèles et Migrations

**Titre:** Mise en Place de la Structure de Données

**Explications:** Nous avons créé le modèle Todo et sa migration correspondante pour définir la structure de la base de données. Nous avons ajouté des champs pour le titre, la description, le statut, la priorité et la date d'échéance.

**Fichiers concernés:**

- `app/Models/Todo.php` - Définition du modèle Todo avec ses relations et attributs
- `database/migrations/2025_04_17_174106_create_todos_table.php` - Migration pour créer la table todos

## 3. Configuration des Relations entre Modèles

**Titre:** Établissement des Relations entre Utilisateurs et Tâches

**Explications:** Nous avons configuré la relation one-to-many entre les utilisateurs et les tâches pour garantir que chaque tâche appartient à un utilisateur spécifique.

**Fichiers concernés:**

- `app/Models/Todo.php` - Ajout de la relation belongsTo avec User
- `app/Models/User.php` - Ajout de la relation hasMany avec Todo

## 4. Développement du Contrôleur des Tâches

**Titre:** Implémentation des Fonctionnalités CRUD

**Explications:** Nous avons créé le contrôleur TodoController avec toutes les méthodes nécessaires pour gérer les opérations CRUD (Création, Lecture, Mise à jour, Suppression) sur les tâches. Nous avons également ajouté la pagination, la recherche et les filtres.

**Fichiers concernés:**

- `app/Http/Controllers/TodoController.php` - Contrôleur avec les méthodes index, create, store, show, edit, update et destroy

## 5. Création des Politiques d'Autorisation

**Titre:** Sécurisation de l'Accès aux Données

**Explications:** Nous avons défini des politiques d'autorisation pour garantir que les utilisateurs ne peuvent accéder et modifier que leurs propres tâches.

**Fichiers concernés:**

- `app/Policies/TodoPolicy.php` - Définition des règles d'autorisation pour différentes actions

## 6. Modifications Apportées

### Migration (create_todos_table.php)

```php
Schema::create('todos', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('description')->nullable();
    $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
    $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
    $table->date('due_date')->nullable();
    $table->timestamps();
});
```

### Modèle Todo (Todo.php)

```php
protected $fillable = [
    'user_id',
    'title',
    'description',
    'status',
    'priority',
    'due_date',
];

public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

### Contrôleur (TodoController.php)

```php
public function index(Request $request)
{
    $query = Todo::query()->where('user_id', Auth::id());

    // Apply search if provided
    if ($request->has('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
              ->orWhere('description', 'like', "%{$searchTerm}%");
        });
    }

    // Paginate results
    $todos = $query->paginate(10)->withQueryString();

    return Inertia::render('todos/index', [
        'todos' => $todos,
        'filters' => [
            'search' => $request->search ?? '',
            'status' => $request->status ?? 'all',
            'priority' => $request->priority ?? 'all',
        ],
    ]);
}
```

## 7. Intégration des Tâches au Tableau de Bord

**Titre:** Fusion des Fonctionnalités Todo dans le Tableau de Bord Principal

**Explications:** Nous avons intégré le système de gestion des tâches directement dans le tableau de bord pour améliorer l'expérience utilisateur. Cette approche permet aux utilisateurs de visualiser et gérer leurs tâches sans quitter la page principale.

**Fichiers concernés:**

- `resources/js/pages/dashboard.tsx` - Interface du tableau de bord avec les tâches intégrées
- `resources/js/components/ui/table.tsx` - Composant de table pour l'affichage des tâches
- `app/Http/Controllers/TodoController.php` - Ajout de la méthode dashboard pour charger les tâches
- `routes/web.php` - Mise à jour de la route du tableau de bord

**Modifications clés:**

1. Ajout de cartes statistiques montrant le nombre de tâches par statut
2. Intégration d'une table de tâches avec recherche et filtres
3. Création d'indicateurs visuels pour le statut et la priorité des tâches
4. Implémentation de la pagination pour gérer un grand nombre de tâches

### Mise à jour du Contrôleur (TodoController.php)

```php
public function dashboard(Request $request)
{
    $query = Todo::query()->where('user_id', Auth::id());

    // Appliquer la recherche si fournie
    if ($request->has('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
              ->orWhere('description', 'like', "%{$searchTerm}%");
        });
    }

    // Appliquer les filtres si fournis
    if ($request->has('status') && $request->status !== 'all') {
        $query->where('status', $request->status);
    }
    
    if ($request->has('priority') && $request->priority !== 'all') {
        $query->where('priority', $request->priority);
    }

    // Trier par date de création (plus récent d'abord)
    $query->orderBy('created_at', 'desc');

    // Paginer les résultats
    $todos = $query->paginate(10)->withQueryString();

    return Inertia::render('dashboard', [
        'todos' => $todos,
        'filters' => [
            'search' => $request->search ?? '',
            'status' => $request->status ?? 'all',
            'priority' => $request->priority ?? 'all',
        ],
    ]);
}
```

### Composant Dashboard (dashboard.tsx)

```tsx
// Cartes statistiques
<div className="grid auto-rows-min gap-4 md:grid-cols-3">
  <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 flex flex-col">
    <h2 className="text-xl font-bold mb-2">Pending Tasks</h2>
    <div className="text-3xl font-bold">
      {todos.data.filter(todo => todo.status === 'pending').length}
    </div>
    <div className="mt-auto text-sm text-muted-foreground">
      Tasks waiting to be started
    </div>
  </div>
  <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 flex flex-col">
    <h2 className="text-xl font-bold mb-2">In Progress</h2>
    <div className="text-3xl font-bold">
      {todos.data.filter(todo => todo.status === 'in_progress').length}
    </div>
    <div className="mt-auto text-sm text-muted-foreground">
      Tasks currently being worked on
    </div>
  </div>
  <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 flex flex-col">
    <h2 className="text-xl font-bold mb-2">Completed</h2>
    <div className="text-3xl font-bold">
      {todos.data.filter(todo => todo.status === 'completed').length}
    </div>
    <div className="mt-auto text-sm text-muted-foreground">
      Tasks already completed
    </div>
  </div>
</div>
```

## 8. Optimisation de la Gestion des Middleware

**Titre:** Mise à Jour des Pratiques de Sécurité pour Laravel 12

**Explications:** Nous avons adapté notre application pour suivre les meilleures pratiques de Laravel 12 concernant la gestion des middleware. Dans Laravel 12, l'approche recommandée est de définir les middleware au niveau des routes plutôt que dans les constructeurs des contrôleurs.

**Fichiers concernés:**

- `app/Http/Controllers/TodoController.php` - Suppression du middleware dans le constructeur
- `routes/web.php` - Confirmation que les middleware d'authentification sont correctement appliqués

**Modifications clés:**

1. Suppression de la méthode `middleware('auth')` dans le constructeur de TodoController
2. Utilisation du groupe de middleware `['auth', 'verified']` dans les routes
3. Amélioration de la structure en suivant les recommandations de Laravel 12
4. Réduction des risques d'erreurs liées aux changements d'API dans Laravel 12

## 9. Correction des Problèmes de Rendu Inertia

**Titre:** Résolution du Problème "Page not found" dans le Tableau de Bord

**Explications:** Nous avons identifié et corrigé un problème de sensibilité à la casse dans le nom de la vue Inertia qui provoquait une erreur "Page not found" lors de l'accès au tableau de bord. Dans Inertia.js, le nom de la vue doit correspondre exactement au nom du fichier, y compris la casse.

**Fichiers concernés:**

- `app/Http/Controllers/TodoController.php` - Correction du nom de la vue dans la méthode dashboard
- `resources/js/pages/dashboard.tsx` - Vérification de la correspondance avec le nom utilisé dans le contrôleur

**Modifications clés:**

1. Modifié `Inertia::render('Dashboard', [])` en `Inertia::render('dashboard', [])`
2. Assuré que la casse du nom de fichier correspond exactement à ce qui est utilisé dans Inertia::render()
3. Vérifié que les routes sont correctement configurées dans web.php
4. Confirmé que le middleware d'authentification fonctionne correctement

## 10. Amélioration de la Navigation Inertia

**Titre:** Optimisation des Interactions Utilisateur dans le Tableau de Bord

**Explications:** Nous avons identifié et résolu un problème de navigation empêchant le bouton "Add New Todo" de fonctionner correctement. La solution implique une modification du mode de navigation pour mieux s'intégrer avec le système de routage d'Inertia.js.

**Fichiers concernés:**

- `resources/js/pages/dashboard.tsx` - Modification du bouton d'ajout de tâches

**Modifications clés:**

1. Remplacé le composant Link par un appel direct à router.visit()
2. Modifié de `<Link href="/todos/create"><Button>...</Button></Link>` à `<Button onClick={() => router.visit('/todos/create')}>...</Button>`
3. Cette approche assure une meilleure intégration avec le système de navigation d'Inertia.js
4. Amélioration de l'expérience utilisateur en garantissant des transitions fluides entre les pages

### Extrait du Code (dashboard.tsx)

```tsx
<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
  <h2 className="text-xl font-bold">Todo List</h2>
  <Button onClick={() => router.visit('/todos/create')}>
    <PlusIcon className="mr-2 h-4 w-4" />
    Add New Todo
  </Button>
</div>
```

## 11. Correction de la Sensibilité à la Casse dans les Chemins Inertia

**Titre:** Résolution des Problèmes de Navigation liés à la Casse des Fichiers

**Explications:** Nous avons identifié et résolu un problème critique lié à la sensibilité à la casse dans les chemins de fichiers. Cette incohérence empêchait le système de trouver les composants React lors de la navigation.

**Problème identifié:**
- Erreur: "Page not found: ./pages/Todos/Create.tsx"
- Le contrôleur utilisait des chemins capitalisés (ex: 'Todos/Create')
- Les fichiers réels utilisaient une structure en minuscules (ex: 'todos/create.tsx')

**Fichiers concernés:**

- `app/Http/Controllers/TodoController.php` - Correction des chemins dans les méthodes render()
- `resources/js/pages/todos/` - Structure de fichiers en minuscules

**Modifications clés:**

1. Alignement des chemins Inertia sur la structure réelle du système de fichiers
2. Modification de tous les appels Inertia::render() pour utiliser des chemins en minuscules:
   - 'Todos/Create' → 'todos/create'
   - 'Todos/Index' → 'todos/index'
   - 'Todos/Show' → 'todos/show'
   - 'Todos/Edit' → 'todos/edit'
3. Application d'une convention de nommage cohérente dans toute l'application

### Extrait du Code (TodoController.php)

```php
/**
 * Show the form for creating a new resource.
 */
public function create()
{
    return Inertia::render('todos/create');
}
```