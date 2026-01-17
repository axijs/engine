## A Note on Our Build Tooling (`tsup` vs. `tsdown`)

You'll notice that all packages in this repository are currently built using `tsup`. 
This is a deliberate choice, this note explains the reasoning behind it.

### The Migration Attempt to `tsdown`

For performance reasons, I recently attempted to migrate the build system from `tsup` to the newer `tsdown`. 
While `tsdown` is incredibly fast, it introduced a critical compatibility issue with type declarations.

The problem arose in a separate downstream project of mine: 
an Angular library that uses **`ng-packagr`**. `tsdown` generates modern, 
format-specific type declarations (`.d.mts` and `.d.cts`), which `ng-packagr` does not support. 
It strictly requires a single, classic `index.d.ts` file to resolve types correctly.

### The Decision to Revert to `tsup`

After exploring several workarounds, 
I concluded that the most stable solution for now is to stick with `tsup`. 
It provides a crucial configuration option that allows us to generate the single, compatible `.d.ts` file needed for the Angular library to work.

This is a temporary measure. 
I will likely revisit `tsdown` in the future. 


