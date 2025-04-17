# Présentation du Système de Gestion des Tâches (Todos)

## 1. Introduction à l'Application

**Titre:** Implémentation d'un Système de Gestion des Tâches avec Laravel 12 et React

**Explications:** Cette application utilise Laravel 12 comme framework backend et React avec ShadcnUI pour le frontend. L'objectif est de créer un système de gestion des tâches (todos) complet avec authentification des utilisateurs et fonctionnalités CRUD.

**Fichiers concernés:** Structure complète du projet Laravel 12 avec React

**Horodatage:** 17/04/2025 18:46


## 2. Création des Modèles et Migrations

**Titre:** Mise en Place de la Structure de Données

**Explications:** Nous avons créé le modèle Todo et sa migration correspondante pour définir la structure de la base de données. Nous avons ajouté des champs pour le titre, la description, le statut, la priorité et la date d'échéance.

**Fichiers concernés:**

  - `app/Models/Todo.php` - Définition du modèle Todo avec ses relations et attributs
  - `database/migrations/2025_04_17_174106_create_todos_table.php` - Migration pour créer la table todos

**Horodatage:** 17/04/2025 18:47


## 3. Configuration des Relations entre Modèles

**Titre:** Établissement des Relations entre Utilisateurs et Tâches

**Explications:** Nous avons configuré la relation one-to-many entre les utilisateurs et les tâches pour garantir que chaque tâche appartient à un utilisateur spécifique.

**Fichiers concernés:**

  - `app/Models/Todo.php` - Ajout de la relation belongsTo avec User
  - `app/Models/User.php` - Ajout de la relation hasMany avec Todo

**Horodatage:** 17/04/2025 18:48


## 4. Développement du Contrôleur des Tâches

**Titre:** Implémentation des Fonctionnalités CRUD

**Explications:** Nous avons créé le contrôleur TodoController avec toutes les méthodes nécessaires pour gérer les opérations CRUD (Création, Lecture, Mise à jour, Suppression) sur les tâches. Nous avons également ajouté la pagination, la recherche et les filtres.

**Fichiers concernés:**

  - `app/Http/Controllers/TodoController.php` - Contrôleur avec les méthodes index, create, store, show, edit, update et destroy

**Horodatage:** 17/04/2025 18:49


## 5. Création des Politiques d'Autorisation

**Titre:** Sécurisation de l'Accès aux Données

**Explications:** Nous avons défini des politiques d'autorisation pour garantir que les utilisateurs ne peuvent accéder et modifier que leurs propres tâches.

**Fichiers concernés:**

  - `app/Policies/TodoPolicy.php` - Définition des règles d'autorisation pour différentes actions

**Horodatage:** 17/04/2025 18:50


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

    return Inertia::render('Todos/Index', [
        'todos' => $todos,
        'filters' => [
            'search' => $request->search ?? '',
            'status' => $request->status ?? 'all',
            'priority' => $request->priority ?? 'all',
        ],
    ]);
}
```

**Horodatage:** 17/04/2025 18:51